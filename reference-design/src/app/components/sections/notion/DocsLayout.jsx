'use client'
import { useState, useRef, useEffect } from "react";
import "../../../globals.css";
import Nav from "./side-nav/Nav";
import HeadProfile from "./HeadProfile";
import { useSwipeScroll } from "../../../hooks/useSwipeScroll";
import useIsMobile from "../../../hooks/useIsMobile";

export default function DocsLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  //scroll till a threshold to go back to home
  const heroRef = useRef(null)
  const notionRef = useRef(null)

  useSwipeScroll({
    onSwipeUp: () => {
      notionRef.current?.scrollIntoView({ behavior: "smooth" })
    },
    onSwipeDown: () => {
      heroRef.current?.scrollIntoView({ behavior: "smooth" })
    },
    threshold: 90, // adjust to your liking
  })

  //auto-collapse on small screens
  useEffect(() => {

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };
    handleResize(); // Call it once to set the initial state
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);



  return (
    <>

      {/* notion layout starts here*/}
      <div className="flex h-screen snap-start">

        <button onClick={() => setIsOpen((prev) => !prev)} className="fixed left-10 top-5 z-101 h-7 w-7 p-1 text-white rounded backdrop-blur-3xl
                bg-black/10  hover:bg-[#000] focus:bg-[#000] active:bg-[#000] active:scale-125">
          <img src="/images/nav/toggle.jpg" alt="Toggle Sidebar" className="h-full w-full object-contain" />
        </button>

        <aside
          className={`
          scrollbar-hide z-100 h-full bg-[#2A2929] overflow-auto
          transition-all duration-300 ease-in-out flex-shrink-0
        `}
          style={{
            flexBasis: isOpen ? (isMobile ? '100%' : '30%') : '0px',
          }}
        >
          <div
            className={`m-5 mt-15 md:mt-20 p-5 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
          >
            <HeadProfile />
            <Nav setIsOpen={setIsOpen} isMobile={isMobile} />
          </div>
        </aside>


        <main
          className={`
              flex-1 md:p-3 bg-[#2A2929] transition-all duration-500 w-full
            `}
        >
          <div className="rounded-2xl bg-[#191919] overflow-auto h-full w-full">
            {children}
          </div>
        </main>

      </div >
    </>
  );
}
