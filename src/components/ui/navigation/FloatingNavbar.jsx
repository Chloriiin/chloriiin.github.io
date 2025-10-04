import React, { useEffect, useState } from "react";
import ContactButtons from "./ContactButtons";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "../../../lib/hooks/useIsMobile";
import useSectionInView from "../../../lib/hooks/useSectionInView";

const FloatingNavbar = () => {
    const isMobile = useIsMobile(640);
    const [time, setTime] = useState("");
    const [isNight, setIsNight] = useState(false);
    const isHomeInView = useSectionInView("home");

    // Update time every second
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hour = now.getHours();
            const timeString = now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "America/New_York",
            });
            setTime(timeString);
            setIsNight(hour < 6 || hour >= 18);
        };

        updateTime();
        const interval = setInterval(updateTime, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <nav
            className="home-nav gap-2 p-1 sm:px-4 sm:gap-4 top-4 z-110 backdrop-blur-3xl bg-white/10 border border-white/20 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 flex"
        >
            <div className="w-[40px] h-[40px] border-[1px] border-black rounded-[10px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
            </div>
            <button>
                {isMobile ? (
                    <a href="#home">Alex Rivera</a>
                ) : (
                    <>
                        <span className="p-2 transition-all duration-300 text-[10px] sm:text-xs tracking-wide">
                            <a href="#home">Alex Rivera</a>
                        </span>
                        <span className="p-2 hidden sm:block transition-all duration-300 text-[10px] sm:text-xs tracking-wide">
                            <a href="#home">Alex Rivera · Creative Dev</a>
                        </span>
                    </>
                )}
            </button>

            <span className="flex gap-1 items-center text-sm">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>San Francisco, CA</span>
            </span>

            <span className="flex items-center text-sm relative h-[15px] overflow-clip">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isNight ? "moon" : "sun"}
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: -90, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                            background: isNight ? '#fbbf24' : '#f59e0b'
                        }}
                    />
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.span
                        key={time}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-5 inline-block"
                    >
                        {time}
                    </motion.span>
                </AnimatePresence>
            </span>
            {!isMobile && <ContactButtons />}
        </nav>
    );
};

export default FloatingNavbar;
