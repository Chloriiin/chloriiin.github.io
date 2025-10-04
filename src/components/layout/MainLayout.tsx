'use client'
import { useState, useRef, useEffect, ReactNode } from "react";
import { usePathname } from 'next/navigation';
import Nav from "../sections/notion/side-nav/Nav";
import HeadProfile from "../sections/notion/HeadProfile";
import { useSwipeScroll } from "../../lib/hooks/useSwipeScroll";
import MenuButton from "../ui/MenuButton";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const homeRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  useSwipeScroll({
    onSwipeUp: () => {
      mainRef.current?.scrollIntoView({ behavior: "smooth" })
    },
    onSwipeDown: () => {
      homeRef.current?.scrollIntoView({ behavior: "smooth" })
    },
    threshold: 90,
  })

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {pathname !== '/' && <MenuButton onClick={toggleSidebar} />}
      <div className="flex h-screen snap-start">

        <aside
          className="scrollbar-hide z-100 h-full bg-[#1a1a1a] overflow-auto transition-all duration-300 ease-in-out flex-shrink-0"
          style={{
            flexBasis: isOpen ? (isMobile ? '100%' : '22%') : '0px',
          }}
        >
          <div
            className={`m-5 mt-15 md:mt-20 p-5 transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <HeadProfile />
            <Nav setIsOpen={setIsOpen} isMobile={isMobile} />
          </div>
        </aside>

        <main className="flex-1 md:p-3 bg-[#1a1a1a] transition-all duration-500 w-full">
          <div className="rounded-2xl bg-[#141414] overflow-auto scrollbar-hide h-full w-full">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
