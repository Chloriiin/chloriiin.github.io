"use client";
import React from 'react'
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

const WiggleElement = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-200, 200], [-100, 100]); 
    const rotateY = useTransform(x, [-200, 200], [100, -100]);
    const moveX = useTransform(x, [-200, 200], [-100, 100]);
    const moveY = useTransform(y, [-200, 200], [-100, 100]);


    const springX = useSpring(rotateX, { stiffness: 80, damping: 6 });
    const springY = useSpring(rotateY, { stiffness: 80, damping: 6 });
    const springMoveX = useSpring(moveX, { stiffness: 80, damping: 6 });
    const springMoveY = useSpring(moveY, { stiffness: 80, damping: 6 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = ((e.clientX - rect.left) / rect.width - 0.5) * 50;
        const offsetY = ((e.clientY - rect.top) / rect.height - 0.5) * 50;

        x.set(offsetX);
        y.set(offsetY);
    };


    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
        style={{ 
            rotateX: springX,
            rotateY: springY,
            x: springMoveX,
            y: springMoveY, 
        }}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        >
        {children}
        </motion.div>
    );
};

export default WiggleElement;