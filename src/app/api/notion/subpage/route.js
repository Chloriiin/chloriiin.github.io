import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

function createNotionClient() {
  const notionToken = process.env.NOTION_API_KEY;
  if (!notionToken) {
    throw new Error('NOTION_API_KEY environment variable is not configured.');
  }
  return new Client({ auth: notionToken });
}

// Fetch blocks from a specific block ID
async function fetchBlockChildren(notion, blockId) {
  let allBlocks = [];
  let cursor = undefined;
  
  try {
    do {
      const response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 100,
        start_cursor: cursor,
      });
      
      allBlocks = allBlocks.concat(response.results);
      cursor = response.next_cursor || undefined;
      
      // Also fetch child blocks for nested content, BUT NOT for child_page blocks
      for (const block of response.results) {
        const typedBlock = block;
        // Skip child_page blocks - we don't want to include their content directly
        if (typedBlock.has_children && typedBlock.type !== 'child_page') {
          try {
            const childBlocks = await fetchBlockChildren(notion, typedBlock.id);
            // Insert child blocks after the parent block
            const parentIndex = allBlocks.findIndex(b => b.id === typedBlock.id);
            if (parentIndex !== -1) {
              allBlocks.splice(parentIndex + 1, 0, ...childBlocks);
            }
          } catch (childError) {
            console.warn('Failed to fetch child blocks for:', typedBlock.id);
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

// Convert Notion blocks to markdown
function blocksToMarkdown(blocks) {
  let markdown = '';
  
  for (const block of blocks) {
    switch (block.type) {
      case 'child_page':
        // Format subpage as a special link that our frontend can interpret
        const pageTitle = block.child_page.title || 'Untitled Subpage';
        markdown += `\n\n## <subpage id="${block.id}" title="${pageTitle}">${pageTitle}</subpage>\n\n`;
        markdown += `*Click to open subpage: ${pageTitle}*\n\n`;
        break;
        
      case 'child_database':
        // Format child database as a note
        const dbTitle = block.child_database.title || 'Database';
        markdown += `\n\n> 📊 **Related Database:** ${dbTitle}\n\n`;
        break;
        
      case 'paragraph':
        const paragraphText = block.paragraph.rich_text
          .map((text) => formatRichText(text))
          .join('');
        if (paragraphText.trim()) {
          markdown += paragraphText + '\n\n';
        }
        break;
        
      case 'heading_1':
        const h1Text = block.heading_1.rich_text
          .map((text) => formatRichText(text))
          .join('');
        markdown += `# ${h1Text}\n\n`;
        break;
        
      case 'heading_2':
        const h2Text = block.heading_2.rich_text
          .map((text) => formatRichText(text))
          .join('');
        markdown += `## ${h2Text}\n\n`;
        break;
        
      case 'heading_3':
        const h3Text = block.heading_3.rich_text
          .map((text) => formatRichText(text))
          .join('');
        markdown += `### ${h3Text}\n\n`;
        break;
        
      case 'bulleted_list_item':
        const bulletText = block.bulleted_list_item.rich_text
          .map((text) => formatRichText(text))
          .join('');
        markdown += `- ${bulletText}\n`;
        break;
        
      case 'numbered_list_item':
        const numberedText = block.numbered_list_item.rich_text
          .map((text) => formatRichText(text))
          .join('');
        markdown += `1. ${numberedText}\n`;
        break;
        
      case 'code':
        const codeText = block.code.rich_text
          .map((text) => text.plain_text)
          .join('');
        const language = block.code.language || '';
        markdown += `\`\`\`${language}\n${codeText}\n\`\`\`\n\n`;
        break;
        
      case 'quote':
        const quoteText = block.quote.rich_text
          .map((text) => formatRichText(text))
          .join('');
        markdown += `> ${quoteText}\n\n`;
        break;
        
      case 'divider':
        markdown += '---\n\n';
        break;
        
      case 'callout':
        const calloutText = block.callout.rich_text
          .map((text) => formatRichText(text))
          .join('');
        const icon = block.callout.icon?.emoji || '💡';
        markdown += `> ${icon} ${calloutText}\n\n`;
        break;
        
      case 'toggle':
        const toggleText = block.toggle.rich_text
          .map((text) => formatRichText(text))
          .join('');
        markdown += `### ${toggleText}\n\n`;
        break;
        
      case 'equation':
        const equation = block.equation.expression;
        markdown += `$$\n${equation}\n$$\n\n`;
        break;
        
      case 'table':
        // Basic table support - can be enhanced later
        markdown += '| Table content |\n|---|\n\n';
        break;
        
      case 'image':
        const imageUrl = block.image.external?.url || block.image.file?.url;
        const caption = block.image.caption?.map((text) => text.plain_text).join('') || '';
        if (imageUrl) {
          markdown += `![${caption}](${imageUrl})\n\n`;
        }
        break;
        
      default:
        // Handle other blocks as plain text
        if (block[block.type]?.rich_text) {
          const plainText = block[block.type].rich_text
            .map((text) => formatRichText(text))
            .join('');
          if (plainText.trim()) {
            markdown += plainText + '\n\n';
          }
        }
    }
  }
  
  return markdown.trim();
}

// Format rich text with markdown styling
function formatRichText(text) {
  // Handle inline equations (special case for Notion equation mentions)
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

export async function GET(request) {
  // Get blockId from the URL
  const url = new URL(request.url);
  const blockId = url.searchParams.get('blockId');
  
  if (!blockId) {
    return NextResponse.json({ error: 'Block ID is required' }, { status: 400 });
  }
  
  try {
    const notion = createNotionClient();

    // First check if the block exists and is a child_page
    const blockInfo = await notion.blocks.retrieve({ block_id: blockId });
    if (!blockInfo) {
      return NextResponse.json({ error: 'Block not found' }, { status: 404 });
    }

    // Fetch the content of the subpage
    const blocks = await fetchBlockChildren(notion, blockId);
    const markdown = blocksToMarkdown(blocks);
    
    return NextResponse.json({ 
      id: blockId,
      title: blockInfo.child_page?.title || 'Untitled Subpage',
      content: markdown 
    });
  } catch (error) {
    console.error('Error fetching subpage:', error);
    return NextResponse.json({ error: 'Failed to fetch subpage content' }, { status: 500 });
  }
}
