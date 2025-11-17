'use client';

import React from 'react';
import MarkdownRenderer from '../../ui/MarkdownRenderer';

interface BlogPageProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    readTime: string;
    publishedAt: string;
    author: string;
    heroImage: string;
    image?: string;
    description?: string;
    tags?: string[];
    date?: string;
    metadata?: {
      createdDate: string;
      lastEditedDate: string;
      availableProperties: string[];
      blockCount: number;
    };
  };
  onBack: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ post, onBack }) => {
  const contentToRender = post.content || `# ${post.title}

*Published on ${post.date || post.publishedAt}*

${post.description || post.excerpt}

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

*Content loaded from blog system*`;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#141414] text-white flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-[#141414] border-b border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#51f0ed] hover:text-white transition-all duration-200 group"
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
              <span className="font-medium">Back to Blog</span>
            </button>
            
            <h1 className="text-xl font-bold text-white">Blog Post</h1>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button className="p-2 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Hero Image */}
          <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden mb-8">
            <img
              src={post.image || post.heroImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Meta info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {(post.tags || []).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#51f0ed]/20 text-[#51f0ed] text-sm rounded-full backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-white text-sm">
                <span>Published on {post.date || post.publishedAt}</span>
                {post.category && (
                  <span className="px-2 py-1 bg-white/10 rounded-full">{post.category}</span>
                )}
                {post.readTime && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Article title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Article description */}
          <div className="mb-8 p-6 bg-[#1a1a1a] rounded-lg border-l-4 border-[#51f0ed]">
            <h2 className="text-lg font-semibold text-white mb-3">Summary</h2>
            <p className="text-gray-300 leading-relaxed">
              {post.description || post.excerpt}
            </p>
          </div>

          {/* Main content */}
          <article className="prose prose-invert prose-lg max-w-none mb-12">
            <MarkdownRenderer content={contentToRender} />
          </article>

          {/* Footer */}
          <div className="pt-8 border-t border-[#2a2a2a] flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white transition-colors group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog Posts
            </button>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Share this post:</span>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button className="p-2 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
