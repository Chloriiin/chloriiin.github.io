import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

if (!process.env.NOTION_API_KEY) {
  console.warn('NOTION_API_KEY environment variable is not set. Notion API requests will fail until it is configured.');
}

// Extract page ID from Notion URL
export function extractPageId(url: string): string {
  const match = url.match(/([a-f0-9]{32}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i);
  return match ? match[0].replace(/-/g, '') : '';
}

// Generate tags based on content using simple keywords
export function generateTags(title: string, content: string): string[] {
  const keywords = [
    'Mathematics', 'Partial Differential Equations', 'PDE', 'Calculus', 'Analysis',
    'Research', 'Academic', 'Theory', 'Applied Math', 'Numerical Methods',
    'Biology', 'Physics', 'Engineering', 'Computational', 'Modeling',
    'Science', 'Education', 'Study Guide', 'Tutorial', 'Advanced Math'
  ];
  
  const text = (title + ' ' + content).toLowerCase();
  const foundTags = keywords.filter(keyword => 
    text.includes(keyword.toLowerCase())
  );
  
  // Always include at least Mathematics if it's math-related
  if (text.includes('equation') || text.includes('math') || text.includes('differential')) {
    if (!foundTags.includes('Mathematics')) foundTags.unshift('Mathematics');
  }
  
  return foundTags.slice(0, 4); // Limit to 4 tags
}

// Get fallback image for math/science topics
export function getFallbackImage(title: string): string {
  const mathKeywords = ['equation', 'differential', 'calculus', 'math', 'formula'];
  const scienceKeywords = ['biology', 'physics', 'chemistry', 'research'];
  
  const titleLower = title.toLowerCase();
  
  if (mathKeywords.some(keyword => titleLower.includes(keyword))) {
    return 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop'; // Math equations
  } else if (scienceKeywords.some(keyword => titleLower.includes(keyword))) {
    return 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&h=400&fit=crop'; // Science lab
  } else {
    return 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop'; // Books/study
  }
}

// Convert Notion blocks to markdown
export function blocksToMarkdown(blocks: any[]): string {
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
          .map((text: any) => formatRichText(text))
          .join('');
        if (paragraphText.trim()) {
          markdown += paragraphText + '\n\n';
        }
        break;
        
      case 'heading_1':
        const h1Text = block.heading_1.rich_text
          .map((text: any) => formatRichText(text))
          .join('');
        markdown += `# ${h1Text}\n\n`;
        break;
        
      case 'heading_2':
        const h2Text = block.heading_2.rich_text
          .map((text: any) => formatRichText(text))
          .join('');
        markdown += `## ${h2Text}\n\n`;
        break;
        
      case 'heading_3':
        const h3Text = block.heading_3.rich_text
          .map((text: any) => formatRichText(text))
          .join('');
        markdown += `### ${h3Text}\n\n`;
        break;
        
      case 'bulleted_list_item':
        const bulletText = block.bulleted_list_item.rich_text
          .map((text: any) => formatRichText(text))
          .join('');
        markdown += `- ${bulletText}\n`;
        break;
        
      case 'numbered_list_item':
        const numberedText = block.numbered_list_item.rich_text
          .map((text: any) => formatRichText(text))
          .join('');
        markdown += `1. ${numberedText}\n`;
        break;
        
      case 'code':
        const codeText = block.code.rich_text
          .map((text: any) => text.plain_text)
          .join('');
        const language = block.code.language || '';
        markdown += `\`\`\`${language}\n${codeText}\n\`\`\`\n\n`;
        break;
        
      case 'quote':
        const quoteText = block.quote.rich_text
          .map((text: any) => formatRichText(text))
          .join('');
        markdown += `> ${quoteText}\n\n`;
        break;
        
      case 'divider':
        markdown += '---\n\n';
        break;
        
      case 'callout':
        const calloutText = block.callout.rich_text
          .map((text: any) => formatRichText(text))
          .join('');
        const icon = block.callout.icon?.emoji || '💡';
        markdown += `> ${icon} ${calloutText}\n\n`;
        break;
        
      case 'toggle':
        const toggleText = block.toggle.rich_text
          .map((text: any) => formatRichText(text))
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
        const caption = block.image.caption?.map((text: any) => text.plain_text).join('') || '';
        if (imageUrl) {
          markdown += `![${caption}](${imageUrl})\n\n`;
        }
        break;
        
      default:
        // Handle other blocks as plain text
        if (block[block.type]?.rich_text) {
          const plainText = block[block.type].rich_text
            .map((text: any) => formatRichText(text))
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
function formatRichText(text: any): string {
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

// Fetch Notion page data
export async function fetchNotionPage(
  pageId: string,
  onProgress?: (current: number, total: number, status: string) => void
) {
  try {
    onProgress?.(0, 100, 'Fetching page properties...');
    
    // Get page properties
    const page = await notion.pages.retrieve({ page_id: pageId });
    
    onProgress?.(20, 100, 'Fetching page content...');
    
    // Get page content (blocks) with pagination
    const allBlocks = await fetchAllBlocks(pageId, (current, total, status) => {
      // Map block progress to overall progress (20-80% range)
      const progressPercent = total > 0 ? (current / total) * 60 + 20 : 20;
      onProgress?.(Math.floor(progressPercent), 100, status);
    });
    
    onProgress?.(80, 100, 'Processing page data...');
    
    // Extract page data
    const pageData = page as any;
    const properties = pageData.properties;
    
    // Get title
    const title = properties.title?.title?.[0]?.plain_text || 
                 properties.Name?.title?.[0]?.plain_text ||
                 'Untitled';
    
    // Get dates
    const createdDate = pageData.created_time ? 
      new Date(pageData.created_time).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : '';
    
    const lastEditedDate = pageData.last_edited_time ? 
      new Date(pageData.last_edited_time).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : '';
    
    // Get cover image
    const coverImage = pageData.cover?.external?.url || 
                      pageData.cover?.file?.url || 
                      getFallbackImage(title);
    
    onProgress?.(90, 100, 'Converting content to markdown...');
    
    // Convert blocks to markdown
    const content = blocksToMarkdown(allBlocks);
    
    // Generate description from first paragraph
    const description = content.split('\n')[0]?.replace(/[#*`]/g, '').trim() || 
                       'A detailed exploration of mathematical concepts and applications.';
    
    // Generate tags
    const tags = generateTags(title, content);
    
    onProgress?.(100, 100, 'Page loaded successfully!');
    
    return {
      title,
      image: coverImage,
      description: description.substring(0, 150) + (description.length > 150 ? '...' : ''),
      tags,
      date: createdDate || lastEditedDate || '',
      content,
      metadata: {
        createdDate: createdDate || 'Not available',
        lastEditedDate: lastEditedDate || 'Not available',
        availableProperties: Object.keys(properties),
        blockCount: allBlocks.length
      }
    };
    
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    throw error;
  }
}

// Fetch all blocks with pagination
export async function fetchAllBlocks(
  blockId: string,
  onProgress?: (current: number, total: number, status: string) => void
): Promise<any[]> {
  let allBlocks: any[] = [];
  let cursor: string | undefined = undefined;
  let pageCount = 0;
  
  onProgress?.(0, 0, 'Starting to fetch blocks...');
  
  // First pass: get all blocks to know the total count
  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: cursor,
    });
    
    allBlocks = allBlocks.concat(response.results);
    cursor = response.next_cursor || undefined;
    pageCount++;
    
    onProgress?.(allBlocks.length, -1, `Fetching blocks... (${allBlocks.length} blocks found)`);
    
  } while (cursor);
  
  const totalBlocks = allBlocks.length;
  onProgress?.(totalBlocks, totalBlocks, `Found ${totalBlocks} blocks, processing...`);
  
  // Second pass: process blocks with children
  let processedBlocks = 0;
  for (let i = 0; i < allBlocks.length; i++) {
    const block = allBlocks[i];
    const typedBlock = block as any;
    
    if (typedBlock.has_children && typedBlock.type !== 'child_page') {
      try {
        onProgress?.(processedBlocks, totalBlocks, `Processing block ${i + 1}/${totalBlocks} (has children)`);
        
        const childBlocks = await fetchAllBlocks(typedBlock.id, (childCurrent, childTotal, childStatus) => {
          onProgress?.(processedBlocks, totalBlocks, `Block ${i + 1}/${totalBlocks}: ${childStatus}`);
        });
        
        // Insert child blocks after the parent block
        const parentIndex = allBlocks.findIndex(b => (b as any).id === typedBlock.id);
        if (parentIndex !== -1) {
          allBlocks.splice(parentIndex + 1, 0, ...childBlocks);
        }
      } catch (childError) {
        console.warn('Failed to fetch child blocks for:', typedBlock.id);
      }
    }
    
    processedBlocks++;
    onProgress?.(processedBlocks, totalBlocks, `Processed block ${processedBlocks}/${totalBlocks}`);
  }
  
  onProgress?.(totalBlocks, totalBlocks, 'All blocks processed successfully!');
  return allBlocks;
}

// Database-specific functions
export async function getDatabaseEntries(databaseId: string) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching database entries:', error);
    throw error;
  }
}

export async function getDatabaseWithProgress(
  databaseId: string, 
  onProgress?: (current: number, total: number, status: string) => void
) {
  try {
    onProgress?.(0, 0, 'Connecting to database...');
    
    // First, get the database structure
    const database = await notion.databases.retrieve({ database_id: databaseId });
    onProgress?.(1, 0, 'Database retrieved, fetching entries...');
    
    // Then get all entries (just the entries, not their full content)
    const entries = await getDatabaseEntries(databaseId);
    const totalEntries = entries.length;
    
    onProgress?.(totalEntries, totalEntries, `Found ${totalEntries} database entries - ready to display!`);
    
    // Don't process each entry's content here - we'll do that on-demand when clicked
    // This makes the initial load much faster
    const processedEntries = entries.map((entry, index) => {
      onProgress?.(index + 1, totalEntries, `Processing entry ${index + 1}/${totalEntries}...`);
      return {
        ...entry,
        blocks: [] // Empty blocks array - we'll fetch content when the subpage is clicked
      };
    });
    
    onProgress?.(totalEntries, totalEntries, 'All database entries processed!');
    return {
      database,
      entries: processedEntries
    };
  } catch (error) {
    console.error('Error fetching database with progress:', error);
    throw error;
  }
}

// Convert database entries to markdown with subpage links
export async function databaseToMarkdown(databaseData: any, onProgress?: (current: number, total: number, status: string) => void) {
  const { database, entries } = databaseData;
  let markdown = `# ${database.title?.[0]?.plain_text || 'Database'}\n\n`;
  
  // Add database description if available
  if (database.description?.length > 0) {
    markdown += `${database.description[0].plain_text}\n\n`;
  }
  
  markdown += `## Database Entries\n\n`;
  markdown += `This database contains ${entries.length} entries:\n\n`;
  
  // Create subpage links for each database entry
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    onProgress?.(i, entries.length, `Creating subpage link ${i + 1}/${entries.length}...`);
    
    // Extract title from the entry properties
    const titleProperty = Object.values(entry.properties).find((prop: any) => prop.type === 'title') as any;
    const title = titleProperty?.title?.[0]?.plain_text || `Entry ${i + 1}`;
    
    // Create a subpage link
    markdown += `<subpage id="${entry.id}" title="${title}" />\n\n`;
  }
  
  onProgress?.(entries.length, entries.length, 'Database markdown generated!');
  return markdown;
}
