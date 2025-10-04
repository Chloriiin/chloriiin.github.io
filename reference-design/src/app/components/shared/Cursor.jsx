"use client";
import { useEffect, useRef } from "react";

const Cursor = () => {
    const blobRef = useRef(null);
    const dotRef = useRef(null);

    useEffect(() => {
        if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
            return;
        }

        const blob = blobRef.current;
        const dot = dotRef.current;

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;

        const textTags = ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "LABEL"];

        const isElementNearText = (el) => {
            if (!el) return false;

            if (textTags.includes(el.tagName)) return true;
            let parent = el.parentElement;
            let count = 0;
            while (parent && count < 3) {
                if (textTags.includes(parent.tagName)) return true;
                parent = parent.parentElement;
                count++;
            }
            return false;
        };

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            blob.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

            // Detect element under cursor once per frame, update dot style directly
            const el = document.elementFromPoint(mouseX, mouseY);
            //cursor transform logic
            const isClickable = (() => {
                let node = el;
                while (node) {
                    if (node.tagName === "BUTTON") return true;
                    node = node.parentElement;
                }
                return false;
            })();

            const nearText = isElementNearText(el);

            // Prioritize clickable over text
            if (isClickable) {
                dot.style.width = "20px";
                dot.style.height = "20px";
                dot.style.borderRadius = "9999px";
                dot.style.backgroundColor = "white";
            } else if (nearText) {
                dot.style.width = "2px";
                dot.style.height = "30px";
                dot.style.borderRadius = "2px";
                dot.style.backgroundColor = "#7bf1a8";
            } else {
                dot.style.width = "12px";
                dot.style.height = "12px";
                dot.style.borderRadius = "9999px";
                dot.style.backgroundColor = "#7bf1a8";
            }



            requestAnimationFrame(animate);
        };

        document.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <>
            <div
                ref={blobRef}
                className="fixed -top-20 -left-30 w-60 h-60 opacity-5 z-[900] bg-green-600 pointer-events-none rounded-full blur-3xl"
                style={{ transform: "translate3d(0, 0, 0)" }}
            />
            <div
                ref={dotRef}
                className="fixed -top-2 -left-3 bg-green-300 z-[901] pointer-events-none mix-blend-difference transition-all duration-300 ease-out"
                style={{ transform: "translate3d(0, 0, 0)" }}
            />
        </>
    );
};

export default Cursor;
