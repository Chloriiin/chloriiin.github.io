// hooks/useActiveSection.ts
import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string>('home'); // Default to home

  useEffect(() => {
    // Check if we're on the main page with sections
    const checkCurrentPage = () => {
      const path = window.location.pathname;
      
      if (path === '/') {
        // Check if we're on the landing page or in the content sections
        const landingElement = document.getElementById('home');
        const contentElement = document.getElementById('content-section');
        
        if (landingElement && contentElement) {
          const landingRect = landingElement.getBoundingClientRect();
          const contentRect = contentElement.getBoundingClientRect();
          
          // If landing page is visible (top is within viewport)
          if (landingRect.top >= -100 && landingRect.top <= 100) {
            setActive('home');
            return;
          }
          
          // If content section is visible, use the active section from ContentSection
          if (contentRect.top <= 100) {
            const currentSection = (window as any).currentActiveSection;
            if (currentSection && sectionIds.includes(currentSection)) {
              setActive(currentSection);
              return;
            }
          }
        }
      }
    };

    // Listen for custom events from ContentSection
    const handleActiveSectionChange = (event: CustomEvent) => {
      if (sectionIds.includes(event.detail)) {
        setActive(event.detail);
      }
    };

    const handleScroll = () => {
      checkCurrentPage();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener('activeSectionChange', handleActiveSectionChange as EventListener);
    
    // Initial check
    checkCurrentPage();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('activeSectionChange', handleActiveSectionChange as EventListener);
    };
  }, [sectionIds]);

  return active;
}
