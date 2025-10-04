'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to manage hamburger button visibility
 * Hides the button on the home section when at the top of the page
 * Shows it when scrolled down or on any other section
 */
export function useHamburgerVisibility() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Function to check if we should show or hide the hamburger button
    const updateVisibility = () => {
      // Check if we're on the home section
      const isHome = !window.location.hash || window.location.hash === '#home' || window.location.hash === '#';
      
      // Check if we're at the top of the page
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const isAtTop = scrollY < 100;
      
      // Only hide the button when we're on the home section AND at the top
      setIsVisible(!(isHome && isAtTop));
    };
    
    // Initial check
    updateVisibility();
    
    // Set up event listeners
    window.addEventListener('scroll', updateVisibility);
    window.addEventListener('hashchange', updateVisibility);
    
    // Check again after a short delay to ensure the DOM is fully loaded
    const timeoutId = setTimeout(updateVisibility, 200);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('hashchange', updateVisibility);
      clearTimeout(timeoutId);
    };
  }, []);
  
  return isVisible;
}
