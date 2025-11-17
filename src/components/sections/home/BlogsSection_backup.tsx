'use client';

import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import MarkdownRenderer from '../../ui/MarkdownRenderer';

interface BlogPost {
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
}

const BlogsSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentBodyOverflow, setCurrentBodyOverflow] = useState('');

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Pushing the Boundaries of AI-Driven Creative Expression",
      excerpt: "Exploring how artificial intelligence can enhance and transform creative processes across digital media and design.",
      content: `# Pushing the Boundaries of AI-Driven Creative Expression

Artificial intelligence has emerged as a powerful catalyst in the realm of creative expression, fundamentally changing how we approach design, art, and digital media. This transformation is not just about automation—it's about augmenting human creativity in ways we never thought possible.

## The Creative Revolution

In the past decade, we've witnessed an unprecedented fusion of human creativity and machine intelligence. From AI-generated artwork that sells for millions at auction to algorithms that compose symphonies, the boundaries between human and artificial creativity continue to blur.

### Key Areas of Impact

- **Visual Arts**: AI tools like DALL-E, Midjourney, and Stable Diffusion have democratized image creation
- **Music Composition**: Platforms like AIVA and Amper Music enable rapid musical prototyping  
- **Writing and Content**: GPT models assist with everything from poetry to technical documentation
- **Interactive Design**: Machine learning enhances user experience through predictive interfaces

## The Human-AI Collaboration Model

Rather than replacing human creators, AI serves as an intelligent collaborator that can:

1. **Accelerate Ideation**: Generate multiple concepts rapidly for human refinement
2. **Handle Repetitive Tasks**: Automate mundane aspects of creative work
3. **Provide New Perspectives**: Suggest unexpected combinations and approaches
4. **Scale Personalization**: Create customized content at unprecedented scale

## Future Implications

As we look toward the future, the integration of AI in creative processes will likely become even more seamless and sophisticated. We're moving toward a world where the most successful creators will be those who can effectively orchestrate human intuition with machine capabilities.

---

*The future of creativity is not human versus machine, but human with machine.*`,
      category: "AI & Creativity",
      readTime: "8 min",
      publishedAt: "2024-03-20",
      author: "Zhi Jiang",
      heroImage: "/images/blog/ai-creativity.jpg",
      image: "https://images.unsplash.com/photo-1677442136019-21780f2f5c8c?w=400&h=300&fit=crop",
      description: "Exploring how artificial intelligence can enhance and transform creative processes across digital media and design.",
      tags: ["AI", "Creativity", "Design", "Technology"],
      date: "March 20, 2024"
    },
    {
      id: 2,
      title: "The Psychology of User Interface Design",
      excerpt: "Understanding cognitive principles that drive effective UI/UX design decisions and user behavior patterns.",
      content: `# The Psychology of User Interface Design

User interface design is fundamentally about understanding human psychology. Every button placement, color choice, and interaction pattern either works with or against the natural tendencies of human cognition.

## Cognitive Load Theory

One of the most important concepts in UI psychology is cognitive load—the amount of mental effort required to use an interface. Effective design minimizes extraneous cognitive load while optimizing the load that directly contributes to user goals.

### Types of Cognitive Load

- **Intrinsic Load**: The inherent difficulty of the task itself
- **Extraneous Load**: Unnecessary mental effort caused by poor design
- **Germane Load**: Productive mental effort that builds understanding

## Visual Hierarchy and Perception

The human visual system processes information in predictable patterns. Understanding these patterns allows designers to guide attention and create intuitive information architectures.

### Key Principles

1. **Gestalt Principles**: How we group and organize visual elements
2. **F-Pattern Reading**: The natural scanning pattern for text-heavy interfaces
3. **Color Psychology**: Emotional and cultural associations with different hues
4. **Spatial Relationships**: How proximity and alignment convey meaning

## Behavioral Psychology in Design

Modern UI design heavily incorporates insights from behavioral psychology to create more engaging and effective interfaces.

### Variable Ratio Reinforcement

This principle, borrowed from behavioral psychology, explains why features like social media notifications are so compelling. The unpredictable nature of rewards creates stronger engagement than consistent rewards.

### The Psychology of Choice

Research shows that while people want options, too many choices can lead to decision paralysis. The optimal number of choices varies by context, but generally follows the "7±2 rule" for menu items and options.

## Emotional Design

Beyond functionality, great interfaces evoke appropriate emotional responses. This involves understanding:

- **Micro-interactions**: Small animations that provide feedback and delight
- **Visual Aesthetics**: How beauty affects perceived usability
- **Trust Indicators**: Design elements that build confidence and credibility

## Conclusion

The most effective interfaces feel intuitive because they align with how humans naturally think, perceive, and behave. By grounding design decisions in psychological principles, we can create experiences that feel effortless and engaging.

---

*Good design is invisible—it works with human psychology, not against it.*`,
      category: "UX Design",
      readTime: "12 min",
      publishedAt: "2024-03-15", 
      author: "Zhi Jiang",
      heroImage: "/images/blog/ui-psychology.jpg",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop",
      description: "Understanding cognitive principles that drive effective UI/UX design decisions and user behavior patterns.",
      tags: ["Psychology", "UX", "Design", "Cognition"],
      date: "March 15, 2024"
    },
    {
      id: 3,
      title: "Building Resilient Systems: Lessons from Nature",
      excerpt: "How biological systems inspire robust software architecture patterns and fault-tolerant design principles.",
      content: `# Building Resilient Systems: Lessons from Nature

Nature has spent millions of years perfecting systems that are robust, adaptive, and self-healing. By studying these biological patterns, we can design software systems that are similarly resilient to failure and change.

## The Principle of Redundancy

In biology, critical functions are rarely dependent on a single component. Hearts have multiple chambers, brains have redundant neural pathways, and ecosystems have multiple species fulfilling similar roles.

### Application in Software

- **Microservices Architecture**: Distributed systems that can continue functioning even when individual services fail
- **Data Replication**: Multiple copies of critical data across different locations
- **Load Distribution**: Spreading computational load across multiple servers

## Adaptation and Evolution

Biological systems continuously adapt to changing environments through mutation, selection, and evolution. Software systems can incorporate similar mechanisms.

### Evolutionary Approaches

- **A/B Testing**: Natural selection for user interface elements
- **Genetic Algorithms**: Optimization techniques inspired by natural selection  
- **Machine Learning**: Systems that improve performance based on experience
- **Chaos Engineering**: Deliberately introducing failures to build resilience

## Self-Healing Mechanisms

Many biological systems can detect damage and initiate repair processes automatically. Modern software architectures are beginning to incorporate similar capabilities.

### Implementation Strategies

1. **Health Monitoring**: Continuous system health checks
2. **Automatic Recovery**: Self-correcting mechanisms for common failures
3. **Circuit Breakers**: Preventing cascade failures in distributed systems
4. **Graceful Degradation**: Maintaining core functionality when components fail

## Network Effects and Emergence

Complex behaviors in biological systems often emerge from simple interactions between individual components. This principle has profound implications for system design.

### Examples in Software

- **Distributed Consensus**: How individual nodes can agree on global state
- **Swarm Intelligence**: Collective problem-solving in distributed systems
- **Emergent Behaviors**: Complex system behaviors arising from simple rules

## Symbiotic Relationships

In nature, different species often form mutually beneficial relationships. In software, this translates to designing systems that enhance each other's capabilities.

### Modern Applications

- **API Ecosystems**: Services that become more valuable when used together
- **Plugin Architectures**: Extensible systems that benefit from third-party contributions
- **Collaborative Networks**: Systems where user participation improves the experience for everyone

## Conclusion

By studying nature's blueprints for resilience, we can create software systems that are not just robust, but truly adaptive and self-sustaining. The future of system architecture lies in understanding and implementing these time-tested natural patterns.

---

*The best architectures are those that work like living systems—resilient, adaptive, and continuously evolving.*`,
      category: "System Architecture",
      readTime: "10 min",
      publishedAt: "2024-03-05",
      author: "Zhi Jiang", 
      heroImage: "/images/blog/nature-architecture.jpg",
      image: "https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?w=400&h=300&fit=crop",
      description: "Drawing parallels between natural systems and software architecture to create more robust and adaptive digital solutions.",
      tags: ["Architecture", "Biology", "Systems", "Engineering"],
      date: "March 5, 2024"
    }
  ];

  const handlePostClick = (post: BlogPost) => {
    // Store current body overflow style
    setCurrentBodyOverflow(document.body.style.overflow);
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    setSelectedPost(post);
    setIsTransitioning(true);
    
    // Small delay to allow the component to mount before showing transition
    setTimeout(() => {
      setIsDetailVisible(true);
    }, 10);
  };

  const handleBackClick = () => {
    setIsTransitioning(true);
    setIsDetailVisible(false);
    
    // Wait for exit transition to complete before cleanup
    setTimeout(() => {
      // Restore original body overflow
      document.body.style.overflow = currentBodyOverflow;
      
      setSelectedPost(null);
      setIsTransitioning(false);
    }, 300); // Match transition duration
  };

  useEffect(() => {
    return () => {
      // Cleanup: restore body overflow on component unmount
      if (currentBodyOverflow) {
        document.body.style.overflow = currentBodyOverflow;
      }
    };
  }, [currentBodyOverflow]);

  // Show independent blog page when detail is visible or transitioning
  if ((isDetailVisible || isTransitioning) && selectedPost) {
    const contentToRender = selectedPost.content || `# ${selectedPost.title}

*Published on ${selectedPost.date || selectedPost.publishedAt}*

${selectedPost.description || selectedPost.excerpt}

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
      <div className={`fixed inset-0 z-[9999] bg-[#141414] text-white flex flex-col transition-all duration-300 ease-out ${
        isDetailVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}>
        {/* Header */}
        <div className={`flex-shrink-0 bg-[#141414] border-b border-[#2a2a2a] transition-all duration-300 delay-75 ${
          isDetailVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4'
        }`}>
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackClick}
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
        <div className={`flex-1 overflow-y-auto transition-all duration-300 delay-150 ${
          isDetailVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Hero Image */}
            <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden mb-8">
              <img
                src={selectedPost.image || selectedPost.heroImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Meta info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {(selectedPost.tags || []).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#51f0ed]/20 text-[#51f0ed] text-sm rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-white text-sm">
                  <span>Published on {selectedPost.date || selectedPost.publishedAt}</span>
                  {selectedPost.category && (
                    <span className="px-2 py-1 bg-white/10 rounded-full">{selectedPost.category}</span>
                  )}
                  {selectedPost.readTime && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {selectedPost.readTime}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Article title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              {selectedPost.title}
            </h1>

            {/* Article description */}
            <div className="mb-8 p-6 bg-[#1a1a1a] rounded-lg border-l-4 border-[#51f0ed]">
              <h2 className="text-lg font-semibold text-white mb-3">Summary</h2>
              <p className="text-gray-300 leading-relaxed">
                {selectedPost.description || selectedPost.excerpt}
              </p>
            </div>

            {/* Main content */}
            <article className="prose prose-invert prose-lg max-w-none mb-12">
              <MarkdownRenderer content={contentToRender} />
            </article>

            {/* Footer */}
            <div className="pt-8 border-t border-[#2a2a2a] flex items-center justify-between">
              <button
                onClick={handleBackClick}
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
  }

  return (
    <section id="blogs" className="relative h-full min-h-screen">
      {/* Blog List View */}
      <div className="p-5 pt-8 h-full transition-all duration-500">
        <h2 className="text-3xl font-bold text-white mb-8 pb-2 border-b border-[#2a2a2a] inline-block">Blog Posts</h2>
        
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-6"
          columnClassName="space-y-6"
        >
          {posts.map((post, index) => (
            <div key={post.id || index}>
              <div 
                onClick={() => handlePostClick(post)}
                className="block bg-[#000000] rounded-lg overflow-hidden transition-all duration-300 group cursor-pointer hover:bg-[#1a1a1a] transform hover:scale-105"
              >
                <BlogCard post={post} />
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => (
  <>
    <div className="aspect-video overflow-hidden">
      <img
        src={post.image || post.heroImage}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400">{post.date || post.publishedAt}</span>
        {post.category && (
          <span className="text-xs text-[#51f0ed] bg-[#51f0ed]/10 px-2 py-1 rounded-full">
            {post.category}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#51f0ed] transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-400 text-sm mb-3 line-clamp-3">
        {post.description || post.excerpt}
      </p>
      <div className="flex flex-wrap gap-1 mb-3">
        {(post.tags || []).map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="px-2 py-1 bg-[#2a2a2a] text-gray-300 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        {post.readTime && (
          <span className="text-xs text-gray-500">{post.readTime}</span>
        )}
        <span className="text-xs text-gray-500 group-hover:text-[#51f0ed] transition-colors">
          Read more →
        </span>
      </div>
    </div>
  </>
);

export default BlogsSection;
