"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Planet = ({ src = "/images/planet.svg", size = 100, style = {} }) => {
    const planetRef = useRef(null);

    // Safe initialization for SSR (no window)
    const mouseX = useRef(0);
    const targetX = useRef(0);
    const floatAngle = useRef(0);

    // Store window width for normalizing mouse position
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        mouseX.current = window.innerWidth / 2;
        targetX.current = window.innerWidth / 2;

        const handleMouseMove = (e) => {
            targetX.current = e.clientX;
        };
        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            mouseX.current += (targetX.current - mouseX.current) * 0.1;

            // Only compute drift if windowWidth is known
            let driftX = 0;
            if (windowWidth > 0) {
                const normX = (mouseX.current / windowWidth) * 2 - 1;
                driftX = -normX * 15; // drift opposite cursor, max 15px
            }

            floatAngle.current += 0.02;
            const floatY = Math.sin(floatAngle.current) * 10;

            gsap.to(planetRef.current, {
                x: driftX,
                y: floatY,
                duration: 0.3,
                ease: "power1.out",
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [windowWidth]);

    return (
        <img
            ref={planetRef}
            src={src}
            alt="Floating Planet"
            className={`absolute lg:left-1/2 left-[70%] top-[70%] -translate-x-1/2`}
            style={{ width: size, height: size, ...style }}
            draggable={false}
        />
    );
};

export default Planet;
