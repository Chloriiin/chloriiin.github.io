'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

const SmoothLink = ({ href, children, className, onClick }) => {
    const pathname = usePathname()
    const handleClick = (e) => {
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
        if (onClick) onClick(e)
    }
    return (
        <button href={href} onClick={handleClick} className={className}>{children}</button>
    )
}


export default SmoothLink
