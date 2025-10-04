'use client';

import PageWrapper from '../components/PageWrapper';

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-gray-400">Coming soon...</p>
        </div>
      </div>
    </PageWrapper>
  );
}
