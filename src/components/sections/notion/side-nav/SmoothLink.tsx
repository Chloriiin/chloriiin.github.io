'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

interface SmoothLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const SmoothLink: React.FC<SmoothLinkProps> = ({ href, children, className, onClick }) => {
    const pathname = usePathname()
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const [targetPath, hash] = href.split('#')

        if (pathname === targetPath && hash) {
            e.preventDefault()
            const element = document.getElementById(hash)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
                // Optionally update URL hash
                history.pushState(null, '', `#${hash}`)
            }
        }
        if (onClick) onClick()
    }
    return (
        <a href={href} onClick={handleClick} className={className}>{children}</a>
    )
}


export default SmoothLink
