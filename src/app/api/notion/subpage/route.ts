export const dynamic = 'force-static';
export const revalidate = 3600; // regenerate every hour

import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import type {
	BlockObjectResponse,
	PartialBlockObjectResponse,
	RichTextItemResponse,
	ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';

type NotionBlock = BlockObjectResponse | PartialBlockObjectResponse;

function createNotionClient(): Client | null {
	const notionToken = process.env.NOTION_API_KEY;
	if (!notionToken) {
		return null;
	}
	return new Client({ auth: notionToken });
}

async function fetchBlockChildren(notion: Client, blockId: string): Promise<NotionBlock[]> {
	const allBlocks: NotionBlock[] = [];
	let cursor: string | undefined;

	try {
		do {
			const response: ListBlockChildrenResponse = await notion.blocks.children.list({
				block_id: blockId,
				page_size: 100,
				start_cursor: cursor,
			});

			allBlocks.push(...response.results);
			cursor = response.next_cursor ?? undefined;

			for (const block of response.results) {
				const typedBlock = block as BlockObjectResponse;
				if (typedBlock.has_children && typedBlock.type !== 'child_page') {
					try {
						const childBlocks = await fetchBlockChildren(notion, typedBlock.id);
						const parentIndex = allBlocks.findIndex((b) => b.id === typedBlock.id);
						if (parentIndex !== -1) {
							allBlocks.splice(parentIndex + 1, 0, ...childBlocks);
						}
					} catch (childError) {
						console.warn('Failed to fetch child blocks for:', typedBlock.id, childError);
					}
				}
			}
		} while (cursor);

		return allBlocks;
	} catch (error) {
		console.error('Error fetching block children:', error);
		return [];
	}
}

function blocksToMarkdown(blocks: NotionBlock[]): string {
	let markdown = '';

	for (const block of blocks) {
		const blockType = (block as BlockObjectResponse).type;
		switch (blockType) {
			case 'child_page': {
				const page = (block as Extract<BlockObjectResponse, { type: 'child_page' }>).child_page;
				const pageTitle = page?.title || 'Untitled Subpage';
				markdown += `\n\n## <subpage id="${block.id}" title="${pageTitle}">${pageTitle}</subpage>\n\n`;
				markdown += `*Click to open subpage: ${pageTitle}*\n\n`;
				break;
			}
			case 'child_database': {
				const database = (block as Extract<BlockObjectResponse, { type: 'child_database' }>).child_database;
				const dbTitle = database?.title || 'Database';
				markdown += `\n\n> 📊 **Related Database:** ${dbTitle}\n\n`;
				break;
			}
			case 'paragraph': {
				const paragraph = (block as Extract<BlockObjectResponse, { type: 'paragraph' }>).paragraph;
				const paragraphText = paragraph.rich_text.map(formatRichText).join('');
				if (paragraphText.trim()) {
					markdown += `${paragraphText}\n\n`;
				}
				break;
			}
			case 'heading_1': {
				const heading = (block as Extract<BlockObjectResponse, { type: 'heading_1' }>).heading_1;
				const text = heading.rich_text.map(formatRichText).join('');
				markdown += `# ${text}\n\n`;
				break;
			}
			case 'heading_2': {
				const heading = (block as Extract<BlockObjectResponse, { type: 'heading_2' }>).heading_2;
				const text = heading.rich_text.map(formatRichText).join('');
				markdown += `## ${text}\n\n`;
				break;
			}
			case 'heading_3': {
				const heading = (block as Extract<BlockObjectResponse, { type: 'heading_3' }>).heading_3;
				const text = heading.rich_text.map(formatRichText).join('');
				markdown += `### ${text}\n\n`;
				break;
			}
			case 'bulleted_list_item': {
				const bullet = (block as Extract<BlockObjectResponse, { type: 'bulleted_list_item' }>).bulleted_list_item;
				const bulletText = bullet.rich_text.map(formatRichText).join('');
				markdown += `- ${bulletText}\n`;
				break;
			}
			case 'numbered_list_item': {
				const numbered = (block as Extract<BlockObjectResponse, { type: 'numbered_list_item' }>).numbered_list_item;
				const numberedText = numbered.rich_text.map(formatRichText).join('');
				markdown += `1. ${numberedText}\n`;
				break;
			}
			case 'code': {
				const code = (block as Extract<BlockObjectResponse, { type: 'code' }>).code;
				const codeText = code.rich_text.map((text) => text.plain_text).join('');
				const language = code.language || '';
				markdown += `\`\`\`${language}\n${codeText}\n\`\`\`\n\n`;
				break;
			}
			case 'quote': {
				const quote = (block as Extract<BlockObjectResponse, { type: 'quote' }>).quote;
				const quoteText = quote.rich_text.map(formatRichText).join('');
				markdown += `> ${quoteText}\n\n`;
				break;
			}
			case 'divider':
				markdown += '---\n\n';
				break;
					case 'callout': {
						const callout = (block as Extract<BlockObjectResponse, { type: 'callout' }>).callout;
						const calloutText = callout.rich_text.map(formatRichText).join('');
						const iconSource = callout.icon;
						const icon = iconSource && iconSource.type === 'emoji' ? iconSource.emoji ?? '💡' : '💡';
						markdown += `> ${icon} ${calloutText}\n\n`;
						break;
					}
			case 'toggle': {
				const toggle = (block as Extract<BlockObjectResponse, { type: 'toggle' }>).toggle;
				const toggleText = toggle.rich_text.map(formatRichText).join('');
				markdown += `### ${toggleText}\n\n`;
				break;
			}
			case 'equation': {
				const equation = (block as Extract<BlockObjectResponse, { type: 'equation' }>).equation;
				markdown += `$$\n${equation.expression}\n$$\n\n`;
				break;
			}
			case 'table':
				markdown += '| Table content |\n|---|\n\n';
				break;
			case 'image': {
						const imageBlock = (block as Extract<BlockObjectResponse, { type: 'image' }>).image as any;
						const imageUrl = imageBlock?.external?.url || imageBlock?.file?.url;
						const caption = (imageBlock?.caption ?? []).map((text: RichTextItemResponse) => text.plain_text).join('') || '';
				if (imageUrl) {
					markdown += `![${caption}](${imageUrl})\n\n`;
				}
				break;
			}
			default: {
				const genericBlock = (block as BlockObjectResponse)[blockType as keyof BlockObjectResponse];
				if (genericBlock && typeof genericBlock === 'object' && 'rich_text' in genericBlock) {
					const plainText = (genericBlock as { rich_text: RichTextItemResponse[] }).rich_text
						.map(formatRichText)
						.join('');
					if (plainText.trim()) {
						markdown += `${plainText}\n\n`;
					}
				}
			}
		}
	}

	return markdown.trim();
}

function formatRichText(text: RichTextItemResponse): string {
	if (text.type === 'equation') {
		return `$${text.equation.expression}$`;
	}

	let formatted = text.plain_text;

	if (text.annotations.bold) {
		formatted = `**${formatted}**`;
	}
	if (text.annotations.italic) {
		formatted = `*${formatted}*`;
	}
	if (text.annotations.code) {
		formatted = `\`${formatted}\``;
	}
	if (text.href) {
		formatted = `[${formatted}](${text.href})`;
	}

	return formatted;
}

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const blockId = url.searchParams.get('blockId');

	if (!blockId) {
		return NextResponse.json({ error: 'Block ID is required' }, { status: 400 });
	}

	try {
			const notion = createNotionClient();
			if (!notion) {
				return NextResponse.json({ error: 'Notion API is not configured' }, { status: 503 });
			}

		const blockInfo = await notion.blocks.retrieve({ block_id: blockId });
		if (!blockInfo || blockInfo.object !== 'block') {
			return NextResponse.json({ error: 'Block not found' }, { status: 404 });
		}

		const blocks = await fetchBlockChildren(notion, blockId);
		const markdown = blocksToMarkdown(blocks);

		const childPage = (blockInfo as BlockObjectResponse).type === 'child_page'
			? (blockInfo as Extract<BlockObjectResponse, { type: 'child_page' }>).child_page
			: undefined;

		return NextResponse.json({
			id: blockId,
			title: childPage?.title || 'Untitled Subpage',
			content: markdown,
		});
	} catch (error) {
		console.error('Error fetching subpage:', error);
		return NextResponse.json({ error: 'Failed to fetch subpage content' }, { status: 500 });
	}
}
