// hooks/useSectionInView.js
import { useEffect, useState } from "react";

export default function useSectionInView(sectionId) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    const target = document.getElementById(sectionId);
    if (target) observer.observe(target);

    return () => target && observer.unobserve(target);
  }, [sectionId]);

  return inView;
}
