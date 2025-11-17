import React from 'react';
import Image from 'next/image';
import AnimatedAccessButton from '../../ui/AnimatedAccessButton';

// Icon components
const GitHubIcon = () => (
  <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const OrcidIcon = () => (
  <svg className="w-4 h-4 inline mr-2" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
    <path d="M 16 3 C 8.8321388 3 3 8.832144 3 16 C 3 23.167856 8.8321388 29 16 29 C 23.167861 29 29 23.167856 29 16 C 29 8.832144 23.167861 3 16 3 z M 16 5 C 22.086982 5 27 9.9130223 27 16 C 27 22.086978 22.086982 27 16 27 C 9.9130183 27 5 22.086978 5 16 C 5 9.9130223 9.9130183 5 16 5 z M 11 8 A 1 1 0 0 0 11 10 A 1 1 0 0 0 11 8 z M 10 11 L 10 22 L 12 22 L 12 11 L 10 11 z M 14 11 L 14 12 L 14 22 L 18.5 22 C 21.525577 22 24 19.525577 24 16.5 C 24 13.474423 21.525577 11 18.5 11 L 14 11 z M 16 13 L 18.5 13 C 20.444423 13 22 14.555577 22 16.5 C 22 18.444423 20.444423 20 18.5 20 L 16 20 L 16 13 z"/>
  </svg>
);

const researchInterests = [
  {
    title: "Biochemistry and Molecular Biology",
    text: "biochemical mechanisms, inhibitory actions, drug discovery"
  },
  {
    title: "Structural Biology",
    text: "atomic-level molecular interactions, biophysical assays"
  },
  {
    title: "Genetics and Epigenetics",
    text: "gene regulation, chromatin dynamics, CRISPR"
  },
  {
    title: "Computational & Machine Learning Methods for Biology",
    text: "mathematical modeling, AI drug discovery, AI simulation"
  }
];

const education = {
  institution: "Emory University",
  location: "Atlanta, GA",
  period: "08/2022 - 05/2026 (Expected)",
  details: [
    "GPA: 3.992/4.000",
    "(Honors) Bachelor of Science in Biology",
    "Bachelor of Science in Applied Mathematics"
  ]
};

const AboutMeSection: React.FC = () => {
  return (
    <section id="aboutme" className="relative h-full min-h-screen">
      <div className="p-5 pt-8 h-full">
        {/* Header, intro, buttons, and headshot */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between mb-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-white pb-2 inline-block">About Me</h2>
            <div className="max-w-2xl">
              <p className="text-gray-300 text-base leading-relaxed">
                Hello!!! My name is Zhijiang (Zach) Ye, and I am currently pursuing Bachelor of Science in Biology and Applied Mathematics (double major) at Emory University, with an expected graduation in May 2026. In my free time, I enjoy music and Chinese cuisine, and I play bass guitar as a co-founder of{' '}
                <a
                  href="https://www.instagram.com/the.gradient.band/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#70ff64] hover:text-white underline decoration-[#70ff64]/60 decoration-2 underline-offset-4"
                >
                  The Gradient 🎸
                </a>
                !
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4 md:pl-8">
            {/* Buttons in one row */}
            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              <AnimatedAccessButton href="mailto:zhijiang.ye@emory.edu" className="text-xs">
                Email
              </AnimatedAccessButton>
              <AnimatedAccessButton href="https://github.com/Chloriiin" className="text-xs">
                <GitHubIcon />GitHub
              </AnimatedAccessButton>
              <AnimatedAccessButton href="https://www.linkedin.com/in/zhijiangye" className="text-xs">
                <LinkedInIcon />LinkedIn
              </AnimatedAccessButton>
              <AnimatedAccessButton href="/cv_zhijiangye.pdf" className="text-xs">
                Curriculum Vitae
              </AnimatedAccessButton>
              <AnimatedAccessButton href="https://orcid.org/0009-0005-5464-7306" className="text-xs">
                <OrcidIcon />ORCID
              </AnimatedAccessButton>
            </div>
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-[#1f1f1f] shadow-lg shadow-black/40">
              <Image
                src="/out/bass.JPG"
                alt="Zhijiang Ye headshot"
                fill
                priority
                sizes="(min-width: 768px) 9rem, (min-width: 640px) 8rem, 7rem"
                className="object-cover rounded-2xl scale-110"
              />
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-px bg-[#2a2a2a] mb-12"></div>

        {/* Education + Research Interests */}
        <div className="flex justify-end">
          <div className="max-w-4xl w-full flex flex-col md:flex-row gap-12">
            <div className="md:w-2/5">
              <h3 className="text-xl font-semibold text-gray-400 uppercase tracking-wider mb-4">Education</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p className="text-lg font-semibold text-white">{education.institution}</p>
                <p className="text-gray-400">{education.location}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{education.period}</p>
                <ul className="mt-4 space-y-2 list-none">
                  {education.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-gray-300">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:w-3/5">
              <h3 className="text-xl font-semibold text-gray-400 uppercase tracking-wider mb-6">Research Interests</h3>
              <div className="space-y-8">
                {researchInterests.map((interest) => (
                  <div key={interest.title} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <h4 className="text-lg font-semibold mb-2 text-white">
                        {interest.title}
                      </h4>
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="flex items-start gap-3">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {interest.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
