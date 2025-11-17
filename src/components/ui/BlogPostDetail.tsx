'use client';

import React from 'react';
import MarkdownRenderer from '../ui/MarkdownRenderer';
import '@/styles/no-scrollbar.css'; // This will be created if not exists

interface BlogPostDetailProps {
  post: {
    title: string;
    image: string;
    description: string;
    tags: string[];
    date: string;
    content: string;
    isDatabasePost?: boolean;
    databaseEntries?: Array<{
      id: string;
      title: string;
      blocks: any[];
    }>;
    metadata?: {
      createdDate: string;
      lastEditedDate: string;
      availableProperties: string[];
      blockCount: number;
    };
  };
  onBack: () => void;
  onSubpageClick?: (blockId: string) => void;
  isVisible: boolean;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack, onSubpageClick, isVisible }) => {
  // Function to render database entries as interactive subpages
  const renderDatabaseContent = (content: string) => {
    if (!post.isDatabasePost) {
      return <MarkdownRenderer content={content} />;
    }

    // Parse subpage tags and replace them with interactive components
    const subpageRegex = /<subpage id="([^"]+)" title="([^"]+)" \/>/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = subpageRegex.exec(content)) !== null) {
      // Add text before the subpage tag
      if (match.index > lastIndex) {
        const beforeText = content.slice(lastIndex, match.index);
        if (beforeText.trim()) {
          parts.push(
            <div key={`text-${lastIndex}`} className="mb-4">
              <MarkdownRenderer content={beforeText} />
            </div>
          );
        }
      }

      // Add the interactive subpage component
      const [, id, title] = match;
      parts.push(
        <div key={`subpage-${id}`} className="mb-4">
          <button
            onClick={() => onSubpageClick?.(id)}
            className="w-full p-4 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#3a3a3a] hover:border-[#51f0ed] rounded-lg transition-all duration-200 group text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#51f0ed]/20 rounded-lg flex items-center justify-center group-hover:bg-[#51f0ed]/30 transition-colors">
                  <svg className="w-4 h-4 text-[#51f0ed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium group-hover:text-[#51f0ed] transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Click to view database entry
                  </p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-[#51f0ed] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add any remaining text after the last subpage tag
    if (lastIndex < content.length) {
      const remainingText = content.slice(lastIndex);
      if (remainingText.trim()) {
        parts.push(
          <div key={`text-${lastIndex}`} className="mb-4">
            <MarkdownRenderer content={remainingText} />
          </div>
        );
      }
    }

    return <div>{parts}</div>;
  };
  // Use actual post content or create a rich fallback
  const contentToRender = post.content || `# ${post.title}

*Published on ${post.date}*

${post.description}

---

## Overview

This is a comprehensive exploration of the topic, diving deep into the fundamental concepts and practical applications.

## Key Points

- **Theoretical Foundation**: Understanding the core principles
- **Practical Applications**: Real-world implementation strategies  
- **Current Research**: Latest developments in the field
- **Future Directions**: Emerging trends and opportunities

## Detailed Analysis

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

### Subsection 1

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Subsection 2

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.

## Conclusion

This research opens new avenues for exploration and provides valuable insights for future work in this domain.

---

*Content loaded from Notion API integration*`;

  return (
    <div 
      className={`h-full bg-[#141414] transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      {/* Header with breadcrumb navigation */}
      <div className="sticky top-0 z-10 bg-[#141414]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="p-4">
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={onBack}
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#51f0ed] hover:text-[#70ff64] transition-all duration-200 group"
            >
              <svg 
                className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </button>
            
            {/* Path-style navigation */}
            <div className="flex items-center text-sm overflow-x-auto py-1 no-scrollbar flex-grow">
              <span className="text-gray-500 whitespace-nowrap">blogs</span>
              <span className="text-gray-500 mx-2 whitespace-nowrap">/</span>
              <span className="text-white font-medium whitespace-nowrap">{post.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="h-full overflow-y-auto pb-8" style={{ height: 'calc(100% - 73px)' }}>
        {/* Hero Image */}
        <div className="relative w-full h-64 sm:h-80 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
          
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#51f0ed]/20 text-[#51f0ed] text-sm rounded-full backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
              {post.title}
            </h1>
            <p className="text-gray-300 text-sm">
              Published on {post.date}
            </p>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-6 py-8">
          {/* Article description */}
          <div className="mb-8 p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-[#51f0ed]">
            <p className="text-gray-300 leading-relaxed">
              {post.description}
            </p>
          </div>

          {/* Main content */}
          <article className="prose prose-invert prose-lg max-w-none">
            {renderDatabaseContent(contentToRender)}
          </article>
          
          {/* Metadata section */}
          {post.metadata && (
            <div className="mt-12 p-6 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
              <h3 className="text-lg font-semibold text-[#51f0ed] mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Article Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Created:</span>
                  <span className="text-white ml-2">{post.metadata.createdDate}</span>
                </div>
                <div>
                  <span className="text-gray-400">Last Updated:</span>
                  <span className="text-white ml-2">{post.metadata.lastEditedDate}</span>
                </div>
                <div>
                  <span className="text-gray-400">Content Blocks:</span>
                  <span className="text-white ml-2">{post.metadata.blockCount}</span>
                </div>
                <div>
                  <span className="text-gray-400">Properties:</span>
                  <span className="text-white ml-2">{post.metadata.availableProperties.length}</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer actions */}
          <div className="mt-12 pt-8 border-t border-[#2a2a2a] flex items-center">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white transition-colors group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
