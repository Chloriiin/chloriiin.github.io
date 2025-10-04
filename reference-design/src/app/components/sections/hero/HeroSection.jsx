"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import useIsMobile from "../../../hooks/useIsMobile";
import Planet from "./Planet"
import Contact from "../../shared/Contact";
import PfpStack from "../../shared/PfpStack";


export default function HeroWithWave() {
    const isMobile = useIsMobile(640); // Use custom hook to determine if mobile

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

            gsap.to(pathRef.current, {
                attr: { d: wavePath },
                duration: 0.3,
                ease: "power2.out",
            })

            requestAnimationFrame(animate)
        }

        window.addEventListener("mousemove", handleMouseMove)
        animate()

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <section id="hero" className="z-105 snap-start relative md:p-30 flex flex-col md:h-screen h-screen min-h-[700px] bg-[#0f0f0f] text-white items-center justify-center">

            <div className="mb-15 sticky top-5 z-50">
                <PfpStack />
                {isMobile ? (
                    <div className="mt-5 flex justify-center"><Contact /></div>
                ) : (
                    <></>
                )}
            </div>
            <h1 className="z-10 mb-30 sm:text-5xl text-3xl md:text-center font-bold">Systems thinker with an interdisciplinary background
                in <span className="">Cognitive and Computer Science.</span><br />
                I craft creative solutions <br /> that are <span className="text-green-400">easy to follow, hard to forget.</span></h1>

            <Planet
                size={120}
            />
            <svg
                className="absolute bottom-0 left-0 w-full h-[200px] z-0"
                viewBox="0 0 1000 400"
                preserveAspectRatio="none"
            >
                <path ref={pathRef} fill="#2A2929" d="" />
            </svg>

        </section>
    )
}
