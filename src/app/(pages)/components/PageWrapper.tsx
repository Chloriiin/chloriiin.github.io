'use client';

import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
}

// This component is now simplified since we handle the menu button in the layout
export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="relative">
      {/* Page content */}
      {children}
    </div>
  );
}
