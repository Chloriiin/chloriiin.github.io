import { NextRequest, NextResponse } from 'next/server';
import { fetchNotionPage, extractPageId } from '@/lib/notion';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageUrl = searchParams.get('url');
  const estimate = searchParams.get('estimate'); // New parameter for getting block count estimate
  
  if (!pageUrl) {
    return NextResponse.json({ error: 'Page URL is required' }, { status: 400 });
  }
  
  try {
    const pageId = extractPageId(pageUrl);
    if (!pageId) {
      return NextResponse.json({ error: 'Invalid Notion URL' }, { status: 400 });
    }
    
    // If requesting estimate, return just the block count quickly
    if (estimate === 'true') {
      const estimateData = await fetchNotionPage(pageId);
      return NextResponse.json({ 
        blockCount: estimateData.metadata?.blockCount || 0,
        title: estimateData.title 
      });
    }
    
    // Otherwise return full page data
    const pageData = await fetchNotionPage(pageId);
    return NextResponse.json(pageData);
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page data', details: error instanceof Error ? error.message : 'Unknown error' }, 
      { status: 500 }
    );
  }
}
