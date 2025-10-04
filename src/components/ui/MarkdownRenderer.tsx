import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import '@/styles/katex-custom.css';
import { parseCustomComponents } from '@/lib/markdownUtils';

interface MarkdownRendererProps {
  content: string;
  onSubpageClick?: (id: string, title: string) => void;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onSubpageClick }) => {
  // Process custom components like <subpage> tags
  const processedContent = parseCustomComponents(content);
  
  // Function to handle subpage link clicks
  const handleSubpageClick = (id: string, title: string) => {
    if (onSubpageClick) {
      onSubpageClick(id, title);
    }
  };

  return (
    <div className="markdown-content max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-4xl font-bold text-white mb-6 mt-8 border-b border-[#2a2a2a] pb-2" {...props} />,
          h2: ({ node, children, ...props }) => {
            // Check if this is a subpage heading
            const childArray = React.Children.toArray(children);
            const subpageMatch = childArray.find(child => 
              typeof child === 'string' && 
              child.includes('data-subpage-id=')
            );
            
            if (subpageMatch) {
              // Extract subpage ID and title
              const match = String(subpageMatch).match(/data-subpage-id="([^"]+)" data-subpage-title="([^"]+)"/);
              
              if (match) {
                const [_, id, title] = match;
                
                return (
                  <div 
                    className="my-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-[#51f0ed] hover:bg-[#191f1f] transition-all cursor-pointer"
                    onClick={() => handleSubpageClick(id, title)}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#51f0ed]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                        </svg>
                        {title}
                      </h2>
                      <svg className="w-5 h-5 text-[#51f0ed]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Click to view the content of this subpage
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubpageClick(id, title);
                      }}
                      className="mt-3 px-4 py-2 bg-[#2a2a2a] hover:bg-[#51f0ed] hover:text-black text-[#51f0ed] text-sm rounded-md transition-colors flex items-center gap-2 w-fit"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Open Subpage
                    </button>
                  </div>
                );
              }
            }
            
            // Regular h2 heading
            return <h2 className="text-3xl font-bold text-white mb-4 mt-6" {...props}>{children}</h2>;
          },
          h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold text-white mb-3 mt-5" {...props} />,
          p: ({ node, children, ...props }) => {
            // Check if the paragraph contains math display block ($$)
            const hasMathBlock = React.Children.toArray(children).some(
              (child) => typeof child === 'string' && child.includes('$$')
            );
            
            return hasMathBlock ? 
              <div className="math-display" {...props}>{children}</div> : 
              <p className="text-gray-300 mb-4 leading-relaxed" {...props}>{children}</p>;
          },
          a: ({ node, ...props }) => <a className="text-[#51f0ed] underline hover:text-[#70ff64]" target="_blank" rel="noopener noreferrer" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-[#51f0ed] pl-4 text-gray-400 italic my-4" {...props} />,
          ul: ({ node, ...props }) => <ul className="ml-6 mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="ml-6 mb-4 list-decimal" {...props} />,
          li: ({ node, ...props }) => <li className="text-gray-300 mb-2" {...props} />,
          code: ({ node, className, children, ...props }: any) => {
            const isInline = !className;
            return isInline ? 
              <code className="bg-[#2a2a2a] px-2 py-1 rounded text-[#51f0ed] font-mono text-sm" {...props}>
                {children}
              </code> :
              <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#2a2a2a] my-4 overflow-x-auto">
                <code className="text-[#51f0ed] font-mono text-sm block" {...props}>
                  {children}
                </code>
              </div>
          },
          pre: ({ node, children, ...props }: any) => <div {...props}>{children}</div>,
          img: ({ node, ...props }) => <img className="max-w-full h-auto rounded-lg my-4" {...props} />,
          hr: ({ node, ...props }) => <hr className="border-[#2a2a2a] my-6" {...props} />,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
