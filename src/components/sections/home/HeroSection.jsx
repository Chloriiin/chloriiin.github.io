"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import useIsMobile from "../../../lib/hooks/useIsMobile";
import Planet from "../hero/Planet"
import FloatingNavbar from "../../ui/navigation/FloatingNavbar";

export default function HeroSection() {
    const isMobile = useIsMobile(640);

    const pathRef = useRef(null)
    const mouseX = useRef(0)
    const targetX = useRef(0)

    useEffect(() => {
        const handleMouseMove = (e) => {
            targetX.current = e.clientX
        }

        const animate = () => {
            mouseX.current += (targetX.current - mouseX.current) * 0.1
            const mapped = (mouseX.current / window.innerWidth - 0.5) * 500

            const wavePath = `
        M0,200 
        C250,${200 + mapped} 750,${200 - mapped} 1000,200 
        L1000,400 L0,400 Z
      `

            if (pathRef.current) {
                gsap.to(pathRef.current, {
                    attr: { d: wavePath },
                    duration: 0.3,
                    ease: "power2.out",
                })
            }

            requestAnimationFrame(animate)
        }

        window.addEventListener("mousemove", handleMouseMove)
        animate()

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <section id="home" className="z-105 snap-start relative md:p-30 flex flex-col md:h-screen h-screen min-h-[700px] bg-[#0a0a0a] text-white items-center justify-center">

            <div className="mb-15 sticky top-5 z-50">
                <FloatingNavbar />
            </div>
            
            <h1 className="z-10 mb-30 sm:text-5xl text-3xl md:text-center font-bold max-w-4xl text-center leading-tight">
                Creative developer with a passion for 
                <span className="text-blue-400"> innovative digital experiences</span>.
                <br />
                I build solutions that are 
                <br /> 
                <span className="text-green-400">intuitive to use, impossible to forget.</span>
            </h1>

            <Planet size={120} />
            
            <svg
                className="absolute bottom-0 left-0 w-full h-[200px] z-0"
                viewBox="0 0 1000 400"
                preserveAspectRatio="none"
            >
                <path ref={pathRef} fill="#1a1a1a" d="" />
            </svg>

        </section>
    )
}
