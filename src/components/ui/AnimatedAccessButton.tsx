import React from 'react';

interface AnimatedAccessButtonProps {
  href: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const AnimatedAccessButton: React.FC<AnimatedAccessButtonProps> = ({ 
  href, 
  onClick, 
  className = '',
  children
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`animated-access-button-container ${className}`}>
      <style jsx>{`
        .animated-access-button-container {
          --size: 14px;
          display: inline-block;
        }

        .animated-access-button {
          font-size: var(--size);
          appearance: none;
          background: transparent;
          padding: 0.5em 1.2em;
          border-radius: 100px;
          border: 1px solid white;
          color: white;
          position: relative;
          overflow: hidden;
          transition: color 0.4s ease;
          cursor: pointer;
          font-family: inherit;
        }

        .animated-access-button:hover {
          color: black;
        }

        .btn-content {
          pointer-events: none;
          position: relative;
          z-index: 3;
        }

        .btn-cells {
          position: absolute;
          z-index: 2;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-auto-rows: 1fr;
          overflow: hidden;
        }

        .btn-cells span {
          width: 100%;
          height: 100%;
          display: block;
          position: relative;
        }

        .btn-cells span:before {
          content: "";
          display: block;
          position: absolute;
          width: 50px;
          height: 50px;
          background: #51f0ed;
          background-image: linear-gradient(to right, #51F0ED, color-mix(in srgb, #51F0ED, white 50%));
          transition: transform 0.4s ease;
          transform: scale(0);
          border-radius: 100px;
        }

        .btn-cells span:hover:before {
          transform: scale(12);
        }

        .btn-cells span:hover ~ span:not(:hover) {
          pointer-events: none;
        }
      `}</style>
      
      <button className="animated-access-button" onClick={handleClick}>
        <div className="btn-cells">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="btn-content">
          {children || "Access"}
        </span>
      </button>
    </div>
  );
};

export default AnimatedAccessButton;
