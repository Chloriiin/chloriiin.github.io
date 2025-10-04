'use client';

import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import MarkdownRenderer from '../../ui/MarkdownRenderer';
import ProgressBar from '../../ui/ProgressBar';
import { extractPageId, fetchNotionPage, blocksToMarkdown, fetchAllBlocks } from '@/lib/notion';

const NOTION_ENABLED = process.env.NEXT_PUBLIC_ENABLE_NOTION === 'true';

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
  notionUrl?: string;
  // For subpages
  isSubpage?: boolean;
  parentId?: number;
  blockId?: string;
  // For database posts
  isDatabasePost?: boolean;
  databaseEntries?: Array<{
    id: string;
    title: string;
    blocks: any[];
  }>;
}

const BlogsSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentBodyOverflow, setCurrentBodyOverflow] = useState('');
  const [notionPosts, setNotionPosts] = useState<{[id: number]: BlogPost}>({});
  const [postHistory, setPostHistory] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState({
    current: 0,
    total: 0,
    status: ''
  });
  const [progressTimerRef, setProgressTimerRef] = useState<NodeJS.Timeout | null>(null);

  // Cleanup function for progress timer
  useEffect(() => {
    return () => {
      if (progressTimerRef) {
        clearTimeout(progressTimerRef);
      }
    };
  }, [progressTimerRef]);

  // Function to check if a post is the special database post
  const isDatabasePost = (post: BlogPost) => {
    return post.id === 7 && post.notionUrl?.includes('16481666b45a80e68271cf39a20e509d');
  };

  // Function to extract database ID from the URL
  const extractDatabaseId = (notionUrl: string) => {
    // For database URLs like: https://www.notion.so/yeastin/16481666b45a80e68271cf39a20e509d?v=...
    const match = notionUrl.match(/([a-f0-9]{32})/);
    return match ? match[1] : null;
  };

  // Function to fetch database content
  const fetchDatabaseContent = async (post: BlogPost) => {
    if (!NOTION_ENABLED) {
      return post;
    }
    try {
      // Reset progress
      setLoadingProgress({ current: 0, total: 0, status: 'Extracting database ID...' });
      
      const databaseId = extractDatabaseId(post.notionUrl!);
      if (!databaseId) {
        throw new Error('Could not extract database ID from URL');
      }

      // Simulate progress updates for database
      let current = 0;
      const total = 50; // Estimated for database
      
      const updateProgress = () => {
        if (current < total * 0.9) {
          current += Math.floor(Math.random() * 3) + 1;
          setLoadingProgress({
            current: Math.min(current, total),
            total,
            status: current < 10 ? 'Connecting to database...' :
                   current < 20 ? 'Fetching database structure...' :
                   current < 35 ? `Loading database entries... (${current}/${total})` :
                   'Processing database entries...'
          });
          
          if (current < total * 0.9) {
            setTimeout(updateProgress, 200 + Math.random() * 300);
          }
        }
      };

      updateProgress();

      // Make API call to database endpoint
      const response = await fetch(`/api/notion/database?databaseId=${databaseId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch database content');
      }

      const data = await response.json();
      
      // Show completion
      setLoadingProgress({
        current: data.metadata.entryCount,
        total: data.metadata.entryCount,
        status: `Successfully loaded ${data.metadata.entryCount} database entries!`
      });

      // Create updated post with database content
      const updatedPost: BlogPost = {
        ...post,
        content: data.content,
        metadata: {
          createdDate: data.metadata.createdDate,
          lastEditedDate: data.metadata.lastEditedDate,
          availableProperties: ['Database Entries'],
          blockCount: data.metadata.entryCount
        },
        isDatabasePost: true,
        databaseEntries: data.entries
      };

      // Cache the post
      setNotionPosts(prev => ({ ...prev, [post.id]: updatedPost }));
      
      // Clear progress after a short delay
      setTimeout(() => {
        setLoadingProgress({ current: 0, total: 0, status: '' });
      }, 1000);

      return updatedPost;
    } catch (error) {
      console.error('Failed to fetch database content:', error);
      setLoadingProgress({ current: 0, total: 0, status: 'Error loading database' });
      return post;
    }
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Partial Differential Equation",
      excerpt: "Understanding the fundamental concepts and applications of Partial Differential Equations in mathematics and physics.",
      content: `Loading content from Notion...`,
      category: "Mathematics",
      readTime: "15 min",
      publishedAt: "2024-12-15",
      author: "Zhi Jiang",
      heroImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
      description: "A detailed exploration of partial differential equations, their properties, and applications in various fields.",
      tags: ["Mathematics", "PDE", "Calculus", "Physics"],
      date: "December 15, 2024",
      notionUrl: "https://www.notion.so/yeastin/Partial-Differential-Equation-1d7ce29eec474669bcc1ac2c58e04d59?source=copy_link"
    },
    {
      id: 2,
      title: "Ordinary Differential Equation",
      excerpt: "Comprehensive study of ordinary differential equations, their methods of solution, and applications in mathematical modeling.",
      content: `Loading content from Notion...`,
      category: "Mathematics",
      readTime: "20 min",
      publishedAt: "2024-12-01",
      author: "Zhi Jiang",
      heroImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
      description: "A comprehensive exploration of ordinary differential equations, covering fundamental concepts, solution methods, and real-world applications.",
      tags: ["Mathematics", "ODE", "Differential Equations", "Calculus"],
      date: "December 1, 2024",
      notionUrl: "https://www.notion.so/yeastin/Ordinary-Differential-Equation-53d2717bab964d6f909c0d9b3c051cf9?source=copy_link"
    },
    {
      id: 3,
      title: "Genki Note Unit 11-15",
      excerpt: "Japanese language learning notes covering intermediate grammar patterns, vocabulary, and cultural context from Genki textbook units 11-15.",
      content: `Loading content from Notion...`,
      category: "Language Learning",
      readTime: "25 min",
      publishedAt: "2024-11-15",
      author: "Zhi Jiang",
      heroImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=400&fit=crop",
      description: "Comprehensive notes on Japanese grammar, vocabulary, and cultural insights from Genki textbook units 11-15.",
      tags: ["Japanese", "Language Learning", "Genki", "Grammar"],
      date: "November 15, 2024",
      notionUrl: "https://www.notion.so/yeastin/Genki-Note-Unit-11-15-b029297198b9417ab56eb5fe8547dfa8?source=copy_link"
    },
    {
      id: 4,
      title: "Elementary Japanese Genki I Note Unit 6-10",
      excerpt: "Essential Japanese language foundations covering grammar structures, verb conjugations, and practical vocabulary from Genki I units 6-10.",
      content: `Loading content from Notion...`,
      category: "Language Learning",
      readTime: "30 min",
      publishedAt: "2024-10-20",
      author: "Zhi Jiang",
      heroImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=400&fit=crop",
      description: "Detailed study notes covering Japanese grammar fundamentals, verb forms, and practical vocabulary from Genki I textbook units 6-10.",
      tags: ["Japanese", "Elementary", "Genki I", "Grammar", "Vocabulary"],
      date: "October 20, 2024",
      notionUrl: "https://www.notion.so/yeastin/Elementary-Japanese-Genki-I-Note-Unit-6-10-fa94c93dd728483c961e6fc5a3ab8ff7?source=copy_link"
    },
    {
      id: 5,
      title: "Mathematical Statistics",
      excerpt: "In-depth exploration of mathematical statistics including probability theory, statistical inference, and hypothesis testing methods.",
      content: `Loading content from Notion...`,
      category: "Mathematics",
      readTime: "35 min",
      publishedAt: "2024-09-10",
      author: "Zhi Jiang",
      heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      description: "Comprehensive coverage of mathematical statistics concepts including probability distributions, estimation theory, and statistical testing.",
      tags: ["Statistics", "Mathematics", "Probability", "Data Analysis"],
      date: "September 10, 2024",
      notionUrl: "https://www.notion.so/yeastin/Mathematical-Statistics-78bd803f7e3045939345826aae6f582d?source=copy_link"
    },
    {
      id: 6,
      title: "Elementary Japanese Genki I Note Unit 1-5",
      excerpt: "Foundational Japanese language learning notes covering basic grammar, hiragana, katakana, and essential vocabulary from Genki I units 1-5.",
      content: `Loading content from Notion...`,
      category: "Language Learning", 
      readTime: "28 min",
      publishedAt: "2024-08-25",
      author: "Zhi Jiang",
      heroImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=400&fit=crop",
      description: "Complete beginner's guide to Japanese language basics including writing systems, fundamental grammar, and core vocabulary from Genki I units 1-5.",
      tags: ["Japanese", "Elementary", "Genki I", "Hiragana", "Katakana", "Basics"],
      date: "August 25, 2024",
      notionUrl: "https://www.notion.so/yeastin/Elementary-Japanese-Genki-I-Note-Unit-1-5-f39144688e164f47a29e322dd8b8dba8?source=copy_link"
    },
    {
      id: 7,
      title: "Numerical Methods for Math Modeling",
      excerpt: "Comprehensive study of numerical methods for mathematical modeling, data analysis, and computational mathematics.",
      content: `Loading content from Notion...`,
      category: "Mathematics",
      readTime: "22 min",
      publishedAt: "2024-07-15",
      author: "Zhi Jiang",
      heroImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
      description: "Detailed exploration of numerical methods for mathematical modeling including computational techniques, statistical analysis, and mathematical applications.",
      tags: ["Numerical Methods", "Mathematics", "Modeling", "Computational Math"],
      date: "July 15, 2024",
      notionUrl: "https://www.notion.so/yeastin/16481666b45a80e68271cf39a20e509d?v=5c84e0e860894b23921b3a6c4c31f5cc&source=copy_link"
    },
    {
      id: 8,
      title: "Numerical Methods to Differential Equations",
      excerpt: "Advanced numerical techniques for solving differential equations including finite difference, finite element, and spectral methods.",
      content: `Loading content from Notion...`,
      category: "Mathematics",
      readTime: "18 min",
      publishedAt: "2024-06-20",
      author: "Zhi Jiang",
      heroImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
      description: "Comprehensive coverage of numerical methods for solving differential equations with practical implementation examples.",
      tags: ["Numerical Methods", "Differential Equations", "Mathematics", "Computational"],
      date: "June 20, 2024",
      notionUrl: "https://www.notion.so/yeastin/Numerical-methods-to-differential-equation-18a81666b45a80f1935ed1ce55e33618?source=copy_link"
    },
    {
      id: 9,
      title: "Enzymatic Kinetics",
      excerpt: "Detailed study of enzyme kinetics including reaction mechanisms, inhibition patterns, and kinetic parameter analysis.",
      content: `Loading content from Notion...`,
      category: "Biochemistry",
      readTime: "16 min",
      publishedAt: "2024-05-30",
      author: "Zhi Jiang",
      heroImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop",
      description: "In-depth analysis of enzymatic kinetics covering Michaelis-Menten equations, competitive inhibition, and enzyme regulation.",
      tags: ["Biochemistry", "Enzymes", "Kinetics", "Biology"],
      date: "May 30, 2024",
      notionUrl: "https://www.notion.so/yeastin/Enzymatic-kinetics-1c581666b45a8069a032fc301ba0885a?source=copy_link"
    }
  ];

  // Function to fetch content from Notion
  const fetchNotionContent = async (post: BlogPost) => {
    if (!NOTION_ENABLED) return post;
    if (!post.notionUrl) return post;
    
    // Check if this is the special database post
    if (isDatabasePost(post)) {
      return await fetchDatabaseContent(post);
    }
    
    try {
      const pageId = extractPageId(post.notionUrl);
      if (!pageId) return post;
      
      // Simulate realistic progress tracking with block-style counting
      let progressTimer: NodeJS.Timeout | undefined;
      let currentBlocks = 0;
      let estimatedTotal = Math.floor(Math.random() * 40) + 20; // Random estimate between 20-60 blocks
      
      const updateProgress = () => {
        if (currentBlocks < estimatedTotal * 0.9) {
          // Increment blocks in realistic chunks
          const increment = Math.floor(Math.random() * 5) + 1; // 1-5 blocks at a time
          currentBlocks = Math.min(currentBlocks + increment, Math.floor(estimatedTotal * 0.9));
          
          let status = '';
          const percentage = Math.floor((currentBlocks / estimatedTotal) * 100);
          
          if (currentBlocks < estimatedTotal * 0.3) {
            status = `Fetching blocks... (${currentBlocks}/${estimatedTotal} blocks)`;
          } else if (currentBlocks < estimatedTotal * 0.7) {
            status = `Processing blocks... (${currentBlocks}/${estimatedTotal} blocks)`;
          } else {
            status = `Converting to markdown... (${currentBlocks}/${estimatedTotal} blocks)`;
          }
          
          setLoadingProgress({ 
            current: currentBlocks,
            total: estimatedTotal, 
            status 
          });
          
          // Variable timing to feel more realistic
          const delay = Math.random() * 300 + 100; // 100-400ms delays
          progressTimer = setTimeout(updateProgress, delay);
          setProgressTimerRef(progressTimer);
        }
      };
      
      // Start progress simulation
      setLoadingProgress({ 
        current: 0,
        total: estimatedTotal, 
        status: 'Starting to fetch blocks...' 
      });
      
      updateProgress();
      
      // Make the actual API call
      const response = await fetch(`/api/notion?url=${encodeURIComponent(post.notionUrl)}`);
      
      // Clear the progress timer
      if (progressTimer) {
        clearTimeout(progressTimer);
      }
      setProgressTimerRef(null);
      
      if (!response.ok) {
        console.error('Failed to fetch Notion content:', await response.text());
        setLoadingProgress({ 
          current: 0, 
          total: estimatedTotal, 
          status: 'Failed to load content' 
        });
        return post;
      }
      
      const data = await response.json();
      
      // Show final completion with actual block count
      const actualBlocks = data.metadata?.blockCount || estimatedTotal;
      setLoadingProgress({ 
        current: actualBlocks, 
        total: actualBlocks, 
        status: `Successfully loaded ${actualBlocks} blocks!` 
      });
      
      // Update the post with Notion data
      const updatedPost = {
        ...post,
        content: data.content,
        title: data.title || post.title,
        description: data.description || post.description,
        image: data.image || post.image,
        tags: data.tags || post.tags,
        date: data.date || post.date,
        metadata: data.metadata
      };
      
      // Cache the updated post
      setNotionPosts(prev => ({
        ...prev,
        [post.id]: updatedPost
      }));
      
      return updatedPost;
    } catch (error) {
      console.error('Error fetching Notion content:', error);
      setLoadingProgress({ 
        current: 0, 
        total: 100, 
        status: 'Failed to load content' 
      });
      return post;
    }
  };

  // Function to fetch subpage content
  const fetchSubpageContent = async (blockId: string, parentId: number) => {
    if (!NOTION_ENABLED) {
      return null;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/notion/subpage?blockId=${blockId}`);
      
      if (!response.ok) {
        console.error('Failed to fetch subpage content:', await response.text());
        setIsLoading(false);
        return null;
      }
      
      const data = await response.json();
      
      // Create a new post object for the subpage
      const subpagePost: BlogPost = {
        id: Date.now(), // Generate a unique ID
        title: data.title,
        content: data.content,
        excerpt: data.description,
        description: data.description,
        tags: data.tags,
        date: data.date,
        category: "Subpage",
        readTime: "5 min",
        publishedAt: data.date,
        author: "Zhi Jiang",
        heroImage: "/images/blog/subpage.jpg",
        image: "/images/blog/subpage.jpg",
        isSubpage: true,
        parentId: parentId,
        blockId: blockId
      };
      
      // Add to cached posts
      setNotionPosts(prev => ({
        ...prev,
        [subpagePost.id]: subpagePost
      }));
      
      setIsLoading(false);
      return subpagePost;
    } catch (error) {
      console.error('Error fetching subpage content:', error);
      setIsLoading(false);
      return null;
    }
  };

  const handlePostClick = async (post: BlogPost) => {
    // Store current body overflow style
    setCurrentBodyOverflow(document.body.style.overflow);
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Reset progress state
    setLoadingProgress({
      current: 0,
      total: 0,
      status: ''
    });
    
    // Check if we already have the Notion content cached
    let currentPost = notionPosts[post.id] || post;
    setSelectedPost(currentPost);
    setIsTransitioning(true);
    
    // Add post to history for navigation
    setPostHistory([currentPost]);
    
    // Small delay to allow the component to mount before showing transition
    setTimeout(() => {
      setIsDetailVisible(true);
    }, 10);
    
    // If this is a Notion post and we haven't fetched its content yet, do so now
    if (post.notionUrl && !notionPosts[post.id]) {
      const updatedPost = await fetchNotionContent(post);
      if (selectedPost?.id === post.id) {
        setSelectedPost(updatedPost);
        // Update the post in history too
        setPostHistory([updatedPost]);
        // Reset progress state when done
        setLoadingProgress({
          current: 0,
          total: 0,
          status: ''
        });
      }
    }
  };

  const handleBackClick = () => {
    // If we're in a subpage, go back to parent post
    if (selectedPost?.isSubpage && postHistory.length > 1) {
      const previousPosts = [...postHistory];
      previousPosts.pop(); // Remove current subpage
      const parentPost = previousPosts[previousPosts.length - 1];
      
      // Show parent post
      setSelectedPost(parentPost);
      setPostHistory(previousPosts);
      return;
    }
    
    // Otherwise, close the detail view entirely
    setIsTransitioning(true);
    setIsDetailVisible(false);
    
    // Wait for exit transition to complete before cleanup
    setTimeout(() => {
      // Restore original body overflow
      document.body.style.overflow = currentBodyOverflow;
      
      setSelectedPost(null);
      setPostHistory([]);
      setIsTransitioning(false);
    }, 300); // Match transition duration
  };
  
  // Handle subpage click
  const handleSubpageClick = async (blockId: string, title: string) => {
    if (!selectedPost) return;
    
    // Check if this is a database entry subpage
    if (selectedPost.isDatabasePost && selectedPost.databaseEntries) {
      const databaseEntry = selectedPost.databaseEntries.find(entry => entry.id === blockId);
      if (databaseEntry) {
        // Create a loading placeholder first
        const loadingSubpage: BlogPost = {
          id: Date.now(),
          title: databaseEntry.title,
          content: `# ${databaseEntry.title}\n\nLoading database entry content...`,
          excerpt: "Loading...",
          description: `Loading database entry: ${databaseEntry.title}`,
          tags: ["Database Entry"],
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          category: "Database Entry",
          readTime: "8 min",
          publishedAt: new Date().toISOString(),
          author: "Zhi Jiang",
          heroImage: selectedPost.heroImage || "/images/blog/database.jpg",
          image: selectedPost.image || "/images/blog/database.jpg",
          isSubpage: true,
          parentId: selectedPost.id,
          blockId: blockId
        };
        
        setSelectedPost(loadingSubpage);
        setPostHistory(prev => [...prev, loadingSubpage]);
        setIsLoading(true);
        
        // Now fetch the actual content on-demand
        try {
          setLoadingProgress({ current: 0, total: 100, status: 'Fetching database entry content...' });
          
          // Simulate progress
          let progress = 0;
          const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress < 90) {
              setLoadingProgress({ 
                current: Math.floor(progress), 
                total: 100, 
                status: `Loading ${databaseEntry.title}... (${Math.floor(progress)}%)` 
              });
            }
          }, 200);
          
          let entryBlocks = [];
          try {
            // Fetch the actual blocks for this database entry (it's a page, not a block)
            entryBlocks = await fetchAllBlocks(blockId);
          } catch (apiError: any) {
            console.log('API Error (likely rate limit), using fallback content:', apiError.message);
            // If rate limited or other API error, provide fallback content
            entryBlocks = [
              {
                type: 'paragraph',
                paragraph: {
                  rich_text: [
                    {
                      type: 'text',
                      text: { content: `This is the content for "${databaseEntry.title}".` },
                      plain_text: `This is the content for "${databaseEntry.title}".`
                    }
                  ]
                }
              },
              {
                type: 'paragraph',
                paragraph: {
                  rich_text: [
                    {
                      type: 'text',
                      text: { content: 'Content is temporarily unavailable due to API rate limiting. Please try again in a few minutes for the full content.' },
                      plain_text: 'Content is temporarily unavailable due to API rate limiting. Please try again in a few minutes for the full content.'
                    }
                  ]
                }
              },
              {
                type: 'heading_2',
                heading_2: {
                  rich_text: [
                    {
                      type: 'text',
                      text: { content: 'Key Topics' },
                      plain_text: 'Key Topics'
                    }
                  ]
                }
              },
              {
                type: 'bulleted_list_item',
                bulleted_list_item: {
                  rich_text: [
                    {
                      type: 'text',
                      text: { content: 'This entry contains detailed analysis and examples' },
                      plain_text: 'This entry contains detailed analysis and examples'
                    }
                  ]
                }
              },
              {
                type: 'bulleted_list_item',
                bulleted_list_item: {
                  rich_text: [
                    {
                      type: 'text',
                      text: { content: 'Mathematical formulations and solutions' },
                      plain_text: 'Mathematical formulations and solutions'
                    }
                  ]
                }
              },
              {
                type: 'bulleted_list_item',
                bulleted_list_item: {
                  rich_text: [
                    {
                      type: 'text',
                      text: { content: 'Practical applications and use cases' },
                      plain_text: 'Practical applications and use cases'
                    }
                  ]
                }
              }
            ];
          }
          
          clearInterval(progressInterval);
          setLoadingProgress({ current: 100, total: 100, status: 'Content loaded successfully!' });
          
          // Create the final subpage with actual content
          const databaseSubpage: BlogPost = {
            ...loadingSubpage,
            content: blocksToMarkdown(entryBlocks),
            metadata: {
              createdDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
              lastEditedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
              availableProperties: ['Database Entry'],
              blockCount: entryBlocks.length
            }
          };
          
          setSelectedPost(databaseSubpage);
          setPostHistory(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1] = databaseSubpage;
            return newHistory;
          });
          
          setTimeout(() => {
            setIsLoading(false);
            setLoadingProgress({ current: 0, total: 0, status: '' });
          }, 500);
          
        } catch (error) {
          console.error('Error fetching database entry content:', error);
          setIsLoading(false);
          setLoadingProgress({ current: 0, total: 0, status: 'Error loading content' });
        }
        
        return;
      }
    }
    
    // Regular subpage handling for non-database posts
    // Create a temporary placeholder while loading
    const placeholderSubpage: BlogPost = {
      id: Date.now(),
      title: title,
      content: `# ${title}\n\nLoading subpage content...`,
      excerpt: "Loading...",
      description: "Loading subpage content...",
      tags: ["Subpage"],
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      category: "Subpage",
      readTime: "5 min",
      publishedAt: new Date().toISOString(),
      author: "Zhi Jiang",
      heroImage: "/images/blog/subpage.jpg",
      image: "/images/blog/subpage.jpg",
      isSubpage: true,
      parentId: selectedPost.id,
      blockId: blockId
    };
    
    // Check if we already have this subpage cached
    const existingSubpage = Object.values(notionPosts).find(
      p => p.blockId === blockId && p.isSubpage
    );
    
    if (existingSubpage) {
      // Use cached subpage
      setSelectedPost(existingSubpage);
      setPostHistory(prev => [...prev, existingSubpage]);
    } else {
      // Show placeholder first for better UX
      setSelectedPost(placeholderSubpage);
      setPostHistory(prev => [...prev, placeholderSubpage]);
      setIsLoading(true);
      
      // Then fetch the actual content
      const subpage = await fetchSubpageContent(blockId, selectedPost.id);
      if (subpage) {
        setSelectedPost(subpage);
        setPostHistory(prev => {
          // Replace the placeholder in the history
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = subpage;
          return newHistory;
        });
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup: restore body overflow on component unmount
      if (currentBodyOverflow) {
        document.body.style.overflow = currentBodyOverflow;
      }
    };
  }, [currentBodyOverflow]);
  
  // Pre-fetch Notion content for posts that have Notion URLs
  useEffect(() => {
    const fetchNotionPosts = async () => {
      for (const post of posts) {
        if (post.notionUrl && !notionPosts[post.id]) {
          await fetchNotionContent(post);
        }
      }
    };
    
    fetchNotionPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show independent blog page when detail is visible or transitioning
  if ((isDetailVisible || isTransitioning) && selectedPost) {
    // Use content from Notion if this post has been fetched, otherwise use the default content
    const currentPost = notionPosts[selectedPost.id] || selectedPost;
    const contentToRender = currentPost.content || `# ${currentPost.title}

*Published on ${currentPost.date || currentPost.publishedAt}*

${currentPost.description || currentPost.excerpt}

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
    
    // Determine if this post is loading
    const isCurrentlyLoading = isLoading || 
                    (currentPost.notionUrl && 
                     !notionPosts[currentPost.id] &&
                     contentToRender.includes('Loading content from Notion'));

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
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleBackClick}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#51f0ed] hover:text-[#70ff64] transition-all duration-200 group"
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
                
                {/* Path-style navigation with breadcrumbs */}
                <div className="flex items-center text-sm overflow-x-auto whitespace-nowrap max-w-md py-1">
                  <span className="text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    blogs
                  </span>
                  {postHistory.map((post, index) => (
                    <React.Fragment key={post.id}>
                      <span className="text-gray-500 mx-2 flex items-center">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <span 
                        className={`
                          ${index === postHistory.length - 1 ? 'text-white font-medium bg-[#2a2a2a] px-2 py-1 rounded-md' : 'text-gray-400 hover:text-gray-200 cursor-pointer hover:underline'} 
                          truncate max-w-[150px] transition-all flex items-center
                        `}
                        onClick={() => {
                          // Allow navigation to previous posts in breadcrumb
                          if (index < postHistory.length - 1) {
                            setSelectedPost(post);
                            setPostHistory(postHistory.slice(0, index + 1));
                          }
                        }}
                      >
                        {post.isSubpage && index > 0 && (
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                          </svg>
                        )}
                        {post.title}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
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

                </div>
              </div>
            </div>

            {/* Article title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              {selectedPost.title}
            </h1>

            {/* Article description */}
            <div className="mb-8 p-6 bg-[#1a1a1a] rounded-lg border-l-4 border-[#51f0ed]">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-white mb-3">Summary</h2>
                {currentPost.notionUrl && (
                  <div className="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-1">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
                      alt="Notion"
                      className="w-4 h-4" 
                    />
                    <span className="text-xs text-gray-300">Notion</span>
                  </div>
                )}
              </div>
              <p className="text-gray-300 leading-relaxed">
                {currentPost.description || currentPost.excerpt}
              </p>
            </div>

            {/* Main content */}
            <article className="prose prose-invert prose-lg max-w-none mb-12">
              {isCurrentlyLoading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-6">
                  <div className="relative w-16 h-16">
                    <div className="w-16 h-16 rounded-full border-4 border-[#51f0ed] border-t-transparent animate-spin"></div>
                    {currentPost.isSubpage && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#51f0ed]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full max-w-md">
                    <ProgressBar
                      current={loadingProgress.current}
                      total={loadingProgress.total}
                      status={loadingProgress.status || (currentPost.isSubpage ? 'Loading subpage content...' : 'Loading content from Notion...')}
                      className="mb-4"
                    />
                  </div>
                </div>
              ) : (
                <MarkdownRenderer 
                  content={contentToRender} 
                  onSubpageClick={handleSubpageClick} 
                />
              )}
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
        {/* Header */}
        <h2 className="text-3xl font-bold text-white mb-6 pb-2 border-b border-[#2a2a2a] inline-block">Blog Posts</h2>
        
        {/* About Section */}
        <div className="mb-8">
          <div className="max-w-6xl flex gap-8">
            {/* About Text */}
            <div className="flex-1 max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-[#51f0ed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-[#51f0ed]">About These Notes</h3>
              </div>
              <div className="text-gray-300 text-sm leading-relaxed space-y-3">
                <p>
                  This page contains notes that I have meticulously organized for my own learning purposes. Since high school, I have consistently used Markdown or Notion for note-taking. The primary purpose in keeping these notes is to deepen my own understanding of the material and to have them available as references when needed. I would be very glad and honored if you find my notes helpful.
                </p>
                <p>
                  Moreover, given the nature of my note-taking approach, I cannot guarantee content accuracy equivalent to professional educators, even though I strive for it. Therefore, please carefully examine the content when using these notes. Additionally, I warmly welcome any suggestions and feedback from readers.
                </p>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Made with care for learning and sharing
                </div>
              </div>
            </div>
            
            {/* Category Stats */}
            <div className="flex-shrink-0 w-64">
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a]">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-[#51f0ed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h4 className="text-sm font-semibold text-white">Categories</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    // Calculate category statistics
                    const categoryStats = posts.reduce((acc, post) => {
                      const category = post.category;
                      acc[category] = (acc[category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>);
                    
                    // Sort by count (descending) and then by name
                    const sortedCategories = Object.entries(categoryStats)
                      .sort(([a, countA], [b, countB]) => countB - countA || a.localeCompare(b));
                    
                    return sortedCategories.map(([category, count]) => (
                      <div key={category} className="flex items-center gap-2">
                        <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                          category === 'Mathematics' ? 'bg-blue-400/20 text-blue-300 border border-blue-400/30' :
                          category === 'Language Learning' ? 'bg-green-400/20 text-green-300 border border-green-400/30' :
                          category === 'Biochemistry' ? 'bg-purple-400/20 text-purple-300 border border-purple-400/30' :
                          'bg-gray-400/20 text-gray-300 border border-gray-400/30'
                        }`}>
                          <span>{category}</span>
                          <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                            category === 'Mathematics' ? 'bg-blue-400/40 text-blue-200' :
                            category === 'Language Learning' ? 'bg-green-400/40 text-green-200' :
                            category === 'Biochemistry' ? 'bg-purple-400/40 text-purple-200' :
                            'bg-gray-400/40 text-gray-200'
                          }`}>
                            {count}
                          </span>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
                <div className="mt-4 pt-3 border-t border-[#2a2a2a]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Total Posts</span>
                    <span className="text-[#51f0ed] font-semibold">{posts.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
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
      <div className="flex justify-end items-center">
        <span className="text-xs text-gray-500 group-hover:text-[#51f0ed] transition-colors">
          Read more →
        </span>
      </div>
    </div>
  </>
);

export default BlogsSection;
