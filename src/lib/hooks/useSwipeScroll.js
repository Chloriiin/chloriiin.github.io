import { useEffect, useRef } from 'react';

export function useSwipeScroll({ onSwipeUp, onSwipeDown, threshold = 50 }) {
  const startY = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleTouchStart = (e) => {
      startY.current = e.touches[0].clientY;
      isScrolling.current = false;
    };

    const handleTouchMove = (e) => {
      if (!startY.current) return;

      const currentY = e.touches[0].clientY;
      const diffY = startY.current - currentY;

      if (Math.abs(diffY) > threshold && !isScrolling.current) {
        isScrolling.current = true;
        
        if (diffY > 0 && onSwipeUp) {
          onSwipeUp();
        } else if (diffY < 0 && onSwipeDown) {
          onSwipeDown();
        }
      }
    };

    const handleTouchEnd = () => {
      startY.current = 0;
      setTimeout(() => {
        isScrolling.current = false;
      }, 300);
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeUp, onSwipeDown, threshold]);
}
