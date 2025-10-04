import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  status: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  total, 
  status, 
  className = '' 
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Status text */}
      <div className="text-sm text-gray-300 mb-2 text-center">
        {status}
      </div>
      
      {/* Progress counts */}
      <div className="text-xs text-gray-400 mb-2 text-center">
        {total > 0 ? `${current}/${total} (${percentage}%)` : 'Initializing...'}
      </div>
      
      {/* Progress bar - made thinner */}
      <div className="w-full bg-[#2a2a2a] rounded-full h-1.5">
        <div 
          className="bg-gradient-to-r from-[#51f0ed] to-[#70ff64] h-1.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
