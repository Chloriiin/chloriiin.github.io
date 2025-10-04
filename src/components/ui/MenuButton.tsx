'use client';

import React, { useEffect } from 'react';

interface MenuButtonProps {
  onClick: () => void;
  className?: string;
}

export default function MenuButton({ onClick, className = '' }: MenuButtonProps) {
  // Log when component mounts to verify it's being rendered
  useEffect(() => {
    console.log('MenuButton mounted - Should be visible now');
    
    // Add a visual confirmation that button exists
    const button = document.getElementById('menu-button-test');
    if (button) {
      console.log('Button found in DOM');
    } else {
      console.log('Button not found in DOM');
    }
  }, []);

  return (
    <button 
      onClick={onClick}
      id="menu-button-test"
      style={{
        backgroundColor: 'red',
        position: 'fixed',
        left: '2rem',
        top: '2rem',
        zIndex: 9999,
        width: '3rem',
        height: '3rem',
        padding: '0.5rem',
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)'
      }}
      className={`fixed left-8 top-8 z-[9999] h-12 w-12 p-2 text-white rounded-full bg-red-500 hover:bg-red-700 focus:bg-red-700 active:bg-red-700 active:scale-110 transition-transform duration-300 ${className}`}
    >
      <div className="h-full w-full flex flex-col justify-center space-y-1.5">
        <div className="w-full h-0.5 bg-white"></div>
        <div className="w-full h-0.5 bg-white"></div>
        <div className="w-full h-0.5 bg-white"></div>
      </div>
    </button>
  );
}
