import { useEffect, useRef } from "react";

export function useSwipeScroll({
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
}: {
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  threshold?: number;
}) {
  const startY = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (startY.current === null) return;

      const endY = e.changedTouches[0].clientY;
      const diff = endY - startY.current;

      if (diff > threshold) onSwipeDown();
      else if (diff < -threshold) onSwipeUp();

      startY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeUp, onSwipeDown, threshold]);
}
