import { useEffect, useState } from 'react';

export default function useSectionInView(sectionId) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [sectionId]);

  return isInView;
}
