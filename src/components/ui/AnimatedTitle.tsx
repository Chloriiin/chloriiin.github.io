'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';

export default function AnimatedTitle() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create the first timeline for the skewing/scaling animation
    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        yoyo: true,
        ease: 'power2.inOut'
      }
    })
    .fromTo('.left, .right', {
      svgOrigin: '750 500',
      skewY: (i) => [-30, 15][i],
      scaleX: (i) => [0.6, 0.85][i],
      x: 200
    }, {
      skewY: (i) => [-15, 30][i],
      scaleX: (i) => [0.85, 0.6][i],
      x: -200
    })
    .play(.5);

    // Create the second timeline for text animation
    const tl2 = gsap.timeline();

    document.querySelectorAll('text').forEach((t, i) => {
      tl2.add(
        gsap.fromTo(t, {
          xPercent: -100,
          x: 750
        }, {
          duration: 1,
          xPercent: 0,
          x: 600,
          ease: 'sine.inOut'
        }),
        i % 3 * 0.2
      );
    });

    // Add the pointer move event listener
    window.onpointermove = (e) => {
      tl.pause();
      tl2.pause();
      gsap.to([tl, tl2], {
        duration: 2,
        ease: 'power4',
        progress: e.x / window.innerWidth
      });
    };

    // Clean up event listener on component unmount
    return () => {
      window.onpointermove = null;
    };
  }, []);

  return (
    <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center w-full">
      <svg viewBox="0 0 1500 900" style={{ width: '100%', height: '550px', maxHeight: '70vh', marginLeft: '-120px' }}>
        <defs>
          <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
          </style>
        </defs>
        <mask id="maskLeft">
          <rect x="-50%" width="100%" height="100%" fill="#fff"/>
        </mask>
        <mask id="maskRight">
          <rect x="50%" width="100%" height="100%" fill="#fff"/>
        </mask>
        <g fontFamily="Montserrat, sans-serif" fontWeight={900} fontSize={220} transform="translate(-30,0)">
          <g mask="url(#maskLeft)" fill="#fff" className="left">
            <text y="180">MY</text>
            <text y="350">NAME IS</text>
            <text y="520">ZACH!!!</text>
          </g>
          <g mask="url(#maskRight)" fill="#aaa" className="right">
            <text y="180">Biology Biology</text>
            <text y="350">Applied Math</text>
            <text y="520">And Curiosity</text>
          </g>
        </g>
      </svg>
    </h1>
  );
}
