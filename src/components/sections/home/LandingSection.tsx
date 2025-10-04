"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import useIsMobile from "../../../lib/hooks/useIsMobile";
import NavigationBar from "../../ui/navigation/NavigationBar";
import AnimatedTitle from "../../ui/AnimatedTitle";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrambleTextPlugin);
}



const LandingSection: React.FC = () => {
    // const isMobile = useIsMobile(640); // Commented out as not currently used

    const pathRef = useRef<SVGPathElement>(null)
    const textRef = useRef<HTMLParagraphElement>(null)
    const mouseX = useRef<number>(0)
    const targetX = useRef<number>(0)
    const splitTextRef = useRef<SplitText | null>(null)

    useEffect(() => {
        // Initialize scrambling text effect
        const initScrambleText = () => {
            if (!textRef.current || typeof window === 'undefined') return;
            
            // Fix styling first to ensure correct layout
            textRef.current.style.width = '100%';
            textRef.current.style.display = 'block';
            
            // Set text alignment based on screen size
            const isDesktop = window.innerWidth >= 768;
            textRef.current.style.textAlign = isDesktop ? 'right' : 'center';
            
            // Use your preferred approach for the scramble text effect
            const textBlock = textRef.current;
            
            // Create SplitText instance with configuration to maintain text flow
            const st = new SplitText(textBlock, {
                type: "chars",
                // wordsClass: "word",
                charsClass: "char",
                linesClass: "line",
                position: "relative"
            });
            
            // Store the instance for cleanup
            splitTextRef.current = st;

        
            
            // Fix the styling of lines to prevent vertical stacking
            st.lines.forEach(line => {
                const isDesktop = window.innerWidth >= 768;
                gsap.set(line, {
                    display: "block",
                    width: "100%",
                    textAlign: isDesktop ? "right" : "center",
                    justifyContent: isDesktop ? "flex-end" : "center",
                });
            });
            
            // Set data-content attributes for each character
            st.chars.forEach((char) => {
                gsap.set(char, {
                    attr: { "data-content": char.innerHTML },
                    display: "inline-block",
                    position: "relative",
                    // whiteSpace: "nowrap"
                });
            });
            
            // Add pointer move handler - using your preferred implementation
            const handlePointerMove = (e: PointerEvent) => {
                st.chars.forEach((char) => {
                    const rect = char.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;
                    const dx = e.clientX - cx;
                    const dy = e.clientY - cy;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 100) {
                        gsap.to(char, {
                            overwrite: true,
                            duration: 1.2 - dist / 100,
                            scrambleText: {
                                text: (char as HTMLElement).dataset?.content || char.innerHTML,
                                chars: ".:",
                                speed: 0.5,
                            },
                            ease: 'none'
                        });
                    }
                });
            };
            
            textBlock.addEventListener("pointermove", handlePointerMove);
            
            return () => {
                textBlock.removeEventListener("pointermove", handlePointerMove);
                if (splitTextRef.current) {
                    splitTextRef.current.revert();
                }
            };
        };
        
        // Start scramble text effect after a short delay to ensure DOM is ready
        const scrambleCleanup = setTimeout(initScrambleText, 500);
        
        const handleMouseMove = (e: MouseEvent) => {
            targetX.current = e.clientX
        }

        const animate = () => {
            mouseX.current += (targetX.current - mouseX.current) * 0.1
            
            // Convert mouse position to normalized coordinates (0-1000 for SVG viewBox)
            const mouseXNormalized = (mouseX.current / window.innerWidth) * 1000
            
            // Hill parameters
            const baseY = 200
            const hillHeight = 80
            const hillWidth = 250 // Standard deviation for normal distribution
            
            // Create multiple points for smooth hill curve using normal distribution
            const points = []
            for (let x = 0; x <= 1000; x += 50) {
                // Normal distribution formula: e^(-((x-μ)²)/(2σ²))
                const distance = x - mouseXNormalized
                const normalizedDistance = distance / hillWidth
                const hillY = baseY - (hillHeight * Math.exp(-(normalizedDistance * normalizedDistance) / 2))
                points.push({ x, y: hillY })
            }
            
            // Build smooth SVG path using quadratic curves
            let hillPath = `M0,${points[0].y}`
            
            for (let i = 1; i < points.length; i++) {
                const prevPoint = points[i - 1]
                const currentPoint = points[i]
                
                // Create smooth curves between points
                const controlX = (prevPoint.x + currentPoint.x) / 2
                const controlY = (prevPoint.y + currentPoint.y) / 2
                
                hillPath += ` Q${controlX},${controlY} ${currentPoint.x},${currentPoint.y}`
            }
            
            // Close the path to create filled shape
            hillPath += ` L1000,400 L0,400 Z`

            if (pathRef.current) {
                gsap.to(pathRef.current, {
                    attr: { d: hillPath },
                    duration: 0.4,
                    ease: "power2.out",
                })
            }

            requestAnimationFrame(animate)
        }

        window.addEventListener("mousemove", handleMouseMove)
        animate()

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            clearTimeout(scrambleCleanup);
        }
    }, [])

    return (
        <section id="home" className="z-0 snap-start relative md:p-30 flex flex-col md:h-screen h-screen min-h-[700px] bg-[#0a0a0a] text-white items-center justify-center">

            <div className="mb-20 sticky top-0 z-[100] w-full flex justify-center home-nav-container pt-4">
                <NavigationBar />
            </div>
            
            <div className="z-10 relative w-full flex flex-col md:flex-row items-center justify-center md:-ml-16">
                <div className="w-full md:w-3/4 md:pl-0 md:-ml-12 md:mt-12">
                    <AnimatedTitle />
                </div>
                
                <div className="z-10 w-full md:w-2/5 md:absolute md:right-11 md:top-0 md:mt-12 md:pr-16 px-4 md:text-right">
                    <p ref={textRef} className="sm:text-base text-sm leading-relaxed text-gray-300 text-block" style={{ fontFamily: 'Space Mono, monospace', width: '100%', display: 'block'}}>
                        I am a biological explorer architecting numerical conundrums; a mathematical enthusiast wandering through molecules and proteins; a passionate dreamer chasing inspiration.
                    </p>
                </div>
            </div>

            {/* This SVG acts as a transition to the next section with a higher z-index than nav */}
            <svg
                className="absolute bottom-0 left-0 w-full h-[200px] z-[200]"
                viewBox="0 0 1000 400"
                preserveAspectRatio="none"
                style={{ pointerEvents: 'none' }}
            >
                <path ref={pathRef} fill="#1a1a1a" d="" />
            </svg>

        </section>
    )
}

export default LandingSection
