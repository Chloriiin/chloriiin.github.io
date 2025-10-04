'use client';

import { useState, useEffect } from 'react';

export default function TypedTitle() {
  const fullTitle = "Zach Ye です。";
  const chloriiinPart = "Zach Ye";
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const [selectedStyle, setSelectedStyle] = useState({ fontFamily: '', color: '' });

  const fontFamilies = [
    'SF Pro, "Segoe UI", Helvetica, sans-serif, Palatino', // SF Pro-like
    'Silkscreen, Rockwell, Monaco, Consolas, "Courier New", monospace, Rockwell', // Code-like
    'monospace', // Pixel-like approximation
  ];
  const colors = ['black', '#cf3c83', '#96ccca'];

  useEffect(() => {
    const randomFont = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setSelectedStyle({ fontFamily: randomFont, color: randomColor });
  }, []); // Run once on mount

  // Typing animation effect
  useEffect(() => {
    if (displayedText === fullTitle) {
      setIsTypingComplete(true);
      return;
    }

    const typingSpeed = 500 / fullTitle.length; // Make entire animation last 0.5s
    const timer = setTimeout(() => {
      setDisplayedText(fullTitle.substring(0, displayedText.length + 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, fullTitle]);

  // Flickering cursor effect at consistently 3 times per second
  useEffect(() => {
    const flickerInterval = 333; // Exactly 3 times per second
    const flickerTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, flickerInterval);
    return () => clearInterval(flickerTimer);
  }, []);

  // Render the displayed text with custom styling for "Zach Ye"
  const renderStyledText = () => {
    let chloriiinDisplay = '';
    let restDisplay = '';

    if (displayedText.length <= chloriiinPart.length) {
      chloriiinDisplay = displayedText;
    } else {
      chloriiinDisplay = chloriiinPart;
      restDisplay = displayedText.substring(chloriiinPart.length);
    }

    return (
      <>
        <span style={{ fontFamily: selectedStyle.fontFamily, color: selectedStyle.color }}>
          {chloriiinDisplay}
        </span>
        {/* Apply existing spacing logic for です。 if present in restDisplay */}
        {restDisplay.includes('です。') ? (
          <span className="ml-2 md:ml-4">
            {restDisplay.trim()} {/* trim to handle potential leading space if split logic changes */}
          </span>
        ) : (
          restDisplay
        )}
      </>
    );
  };

  return (
    <h1 className="text-5xl md:text-7xl font-bold mb-4 text-left whitespace-nowrap relative">
      {renderStyledText()}
      <span 
        className={`${showCursor ? 'opacity-100' : 'opacity-0'} ml-1 inline-block`}
        style={{ 
          marginLeft: displayedText.length === fullTitle.length ? '4px' : '1px',
          fontWeight: 'normal',
          transition: 'opacity 0.01s linear' // Very quick transition
        }}
      >
        _
      </span>
    </h1>
  );
} 