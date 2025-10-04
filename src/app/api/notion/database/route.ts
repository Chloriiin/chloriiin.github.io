export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseWithProgress, databaseToMarkdown } from '@/lib/notion';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const databaseId = searchParams.get('databaseId');
  
  if (!databaseId) {
    return NextResponse.json({ error: 'Database ID is required' }, { status: 400 });
  }

  try {
    if (!process.env.NOTION_API_KEY) {
      return NextResponse.json({ error: 'Notion API is not configured' }, { status: 503 });
    }

    console.log('Fetching database:', databaseId);
    
    // Fetch database with progress (though we can't stream progress in this simple API)
    const databaseData = await getDatabaseWithProgress(databaseId);
    
    // Convert to markdown
    const markdown = await databaseToMarkdown(databaseData);
    
    // Extract metadata
    const database = databaseData.database as any;
    const metadata = {
      title: database.title?.[0]?.plain_text || 'Database',
      description: database.description?.[0]?.plain_text || '',
      entryCount: databaseData.entries.length,
      createdDate: new Date(database.created_time).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      lastEditedDate: new Date(database.last_edited_time).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };

    console.log(`Database processed successfully. Found ${databaseData.entries.length} entries.`);
    
    return NextResponse.json({
      content: markdown,
      metadata,
      entries: databaseData.entries.map((entry: any) => ({
        id: entry.id,
        title: (Object.values(entry.properties).find((prop: any) => prop.type === 'title') as any)?.title?.[0]?.plain_text || 'Untitled',
        blocks: entry.blocks
      }))
    });
    
  } catch (error) {
    console.error('Error processing database:', error);
    return NextResponse.json({ 
      error: 'Failed to process database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
