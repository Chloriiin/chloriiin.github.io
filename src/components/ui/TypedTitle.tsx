'use client';

import { useState, useEffect } from 'react';

export default function TypedTitle() {
  const fullTitle = "Hello, my name is Zach Ye!";
  const targetName = "Zach Ye";
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentStyle, setCurrentStyle] = useState({ 
    fontFamily: 'system-ui', 
    color: '#ffffff', 
    fontWeight: 'bold'
  });

  // Creative style variations for the animation (constant font weight)
  const styleVariations = [
    { fontFamily: 'SF Pro, "Segoe UI", Helvetica, sans-serif', color: '#ff6b6b', fontWeight: 'bold' },
    { fontFamily: 'Monaco, Consolas, "Courier New", monospace', color: '#4ecdc4', fontWeight: 'bold' },
    { fontFamily: 'Georgia, Times, serif', color: '#45b7d1', fontWeight: 'bold' },
    { fontFamily: 'Impact, "Arial Black", sans-serif', color: '#96ceb4', fontWeight: 'bold' },
    { fontFamily: 'Palatino, "Times New Roman", serif', color: '#ffeaa7', fontWeight: 'bold' },
    { fontFamily: 'Trebuchet MS, sans-serif', color: '#fd79a8', fontWeight: 'bold' },
    { fontFamily: 'Verdana, Geneva, sans-serif', color: '#6c5ce7', fontWeight: 'bold' },
    { fontFamily: 'Comic Sans MS, cursive', color: '#a29bfe', fontWeight: 'bold' },
    { fontFamily: 'Lucida Console, monospace', color: '#fd63a3', fontWeight: 'bold' },
    { fontFamily: 'Times New Roman, serif', color: '#00b894', fontWeight: 'bold' }
  ];

  const finalStyle = {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#ffffff',
    fontWeight: 'bold'
  };

  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    let lastChangeTime = 0;
    const animationDuration = 3000; // 3 seconds total
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      if (progress < 1) {
        // Define intervals based on time phases
        let currentInterval: number = 125; // Default value
        
        if (elapsed < 2000) {
          // 0-2 sec: fast changes
          currentInterval = 125;
        } else if (elapsed < 2500) {
          // 2-2.5 sec: medium changes
          currentInterval = 200;
        } else if (elapsed < 2900) {
          // 2.5-2.9 sec: slower changes
          currentInterval = 500;
        } else if (elapsed < 3000) {
          // 2.9-3 sec: slowest changes
          currentInterval = 1000;
        } 
        
        // Change style at the specified intervals
        if (elapsed - lastChangeTime >= currentInterval) {
          const randomStyle = styleVariations[Math.floor(Math.random() * styleVariations.length)];
          setCurrentStyle(randomStyle);
          lastChangeTime = elapsed;
        }
        
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Animation complete at 3 seconds - set final style
        setCurrentStyle(finalStyle);
        setIsAnimating(false);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  // Split the text to apply animation only to "Zach Ye"
  const renderStyledText = () => {
    const beforeName = "Hello, my name is ";
    const afterName = "!";
    
    return (
      <>
        <span className="text-white">
          {beforeName}
        </span>
        <span 
          style={currentStyle}
          className={`transition-all duration-75 ${isAnimating ? '' : 'transition-all duration-500'}`}
        >
          {targetName}
        </span>
        <span className="text-white">
          {afterName}
        </span>
      </>
    );
  };

  return (
    <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center whitespace-nowrap">
      {renderStyledText()}
    </h1>
  );
}