"use client";
import SmoothLink from './SmoothLink';
import { useActiveSection } from '../../../../hooks/useActiveSection';

const Nav = ({ setIsOpen, isMobile }) => {
    const sections = [
        { label: "Home", href: "/#hero", id: "hero" },
        { label: "Projects", href: "/#projects", id: "projects" },
        { label: "About Me", href: "/#aboutme", id: "aboutme" },
    ];
    const active = useActiveSection(sections.map((s) => s.id));
    return (
        <nav className="flex flex-col gap-4 text-sm text-[#727272] align-left">
            {sections.map(({ label, href, id }) => (
                <SmoothLink
                    key={label}
                    href={href}
                    className={`transition-all flex ${active === id ? "text-white font-semibold" : "hover:text-white"
                        }`}
                    onClick={() => {
                        if (isMobile) setIsOpen(false);
                    }}
                >
                    {label}
                </SmoothLink>
            ))}
        </nav>
    );
};

export default Nav;
