'use client';

import React, { useRef, useEffect, useState } from 'react';
import ProjectsSection from './ProjectsSection';
import PublicationsSection from './PublicationsSection';
import BlogsSection from './BlogsSection';
import AboutMeSection from './AboutMeSection';

const ContentSection: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const publicationsRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('home'); // Start with home since users land on the landing page first

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const threshold = containerHeight * 0.3; // 30% of viewport height

      const sections = [
        { id: 'projects', ref: projectsRef },
        { id: 'publications', ref: publicationsRef },
        { id: 'blogs', ref: blogRef },
        { id: 'aboutme', ref: aboutRef },
      ];

      for (const section of sections) {
        const element = section.ref.current;
        if (!element) continue;

        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;

        if (containerTop + threshold >= elementTop && containerTop + threshold < elementBottom) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Store active section in window for Nav component to access
  useEffect(() => {
    (window as any).currentActiveSection = activeSection;
    // Dispatch custom event to notify Nav component
    window.dispatchEvent(new CustomEvent('activeSectionChange', { detail: activeSection }));
  }, [activeSection]);

  return (
    <section id="content-section" className="flex flex-col h-full">
      <div 
        ref={scrollContainerRef}
        className="flex-grow overflow-auto scrollbar-hide snap-y snap-mandatory"
        style={{
          scrollSnapType: 'y mandatory',
          scrollSnapStop: 'always'
        }}
      >
        <div ref={projectsRef} className="snap-start snap-always min-h-screen flex flex-col" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <ProjectsSection />
        </div>
        <div ref={publicationsRef} className="snap-start snap-always min-h-screen flex flex-col" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <PublicationsSection />
        </div>
        <div ref={blogRef} className="snap-start snap-always min-h-screen flex flex-col relative overflow-hidden" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <BlogsSection />
        </div>
        <div ref={aboutRef} className="snap-start snap-always min-h-screen flex flex-col" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
          <AboutMeSection />
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
