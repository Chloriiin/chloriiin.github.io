"use client"
import React from 'react'
import WiggleElement from '../../shared/WiggleElement'
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1
}


const projects = [
    {
        title: "Every creation is a Pearl",
        image: "/images/projects/Pearl.png",
        description: "A community driven platform for artists to showcase their work, connect with others, and explore the world of comic.",
        tag: ["💻 Website", "Product Design", "Frontend Dev", "Procreate", "Multi-media"],
        status: "In progress",
        clickable: false,
        href: null
    },
    {
        title: "Undergraduate Researcher – Computational Neuroscience & Data Analytics",
        image: "/images/projects/nsd.png",
        description: "Exploring the Natural Scenes Dataset (NSD) to understand how the human brain processes natural images.",
        tag: ["📊 Data", "Exploratory Data Analysis", "Natural Scenes Dataset (NSD)", "R", "Python", "SQL", "AWS"],
        status: "View Project",
        clickable: true,
        href: "https://github.com/0CocoWang0/NSD_cogsci"
    },
    {
        title: "Website for NORD consulting club at McGill",
        image: "/images/projects/NORD.png",
        description: "Leading the revamp of NORD Consulting’s website to enhance UI/UX, modernize the design, and improve SEO.",
        tag: ["💻 Website", "Webflow", "Front-end Dev", "CMS", "SSR"],
        status: "View Project",
        clickable: true,
        href: "https://msbn-consulting.webflow.io"
    },
    {
        title: "ARIPPLE: When Arts Ripple - a novel solution for artists",
        image: "/images/projects/aripple.png",
        description: "Currently developing core features, including user authentication, artwork trading, and subscription-based monetization.",
        tag: ["💻 Website", "🍎 Software", "Product Design", "Full-stack Dev", "React", "Next.js", "SSR"],
        status: "In Progress",
        clickable: true,
        href: "https://aripple.vercel.app"
    },
    {
        title: "Being an artist in the digital age",
        image: "/images/projects/manga.png",
        description: "Without boundary, I create stories and characters that transcend the limits of reality.",
        tag: ["🎨 Design", "Procreate", "Multi-media", "Animation"],
        status: "In progress",
        clickable: false,
        href: null
    },



]

const Cards = () => {
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-6"
            columnClassName="space-y-6"
        >
            {projects.map((project, index) => (
                <a
                    key={index}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-inside-avoid mb-6 block cursor-pointer group"
                    style={{ verticalAlign: "top" }}
                >

                    <div className="bg-[#000000] hover:bg-[#222121] active:bg-[#222121] focus:bg-[#222121] rounded-xl overflow-clip gap-2 grid pb-3">
                        <div className="h-[170px] overflow-clip">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="px-5">
                            <h3 className="text-white text-sm mb-2">{project.title}</h3>
                            <p className="text-[#727272] text-[10px]">{project.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 px-5">
                            {project.tag.map((tag, index) => (
                                <WiggleElement key={index}>
                                    <span className="bg-[#2A2929] text-white text-[10px] p-1 rounded-sm">
                                        {tag}
                                    </span>
                                </WiggleElement>
                            ))}
                        </div>
                        <div className="place-self-end px-5">
                            <button
                                className={`text-[10px] inline-flex items-center justify-self-center gap-2 pointer-events-auto font-semibold rounded-lg px-2 py-2 ${project.clickable
                                    ? "text-white group-hover:underline decoration-[#91EAE4] decoration-wavy"
                                    : "text-[#727272] pointer-events-none"
                                    }`}
                            >
                                {project.status}
                                <img
                                    src="/images/nav/arrowdown.jpg"
                                    className="h-1 -rotate-90 transform transition-transform duration-200 group-hover:translate-x-[3px]"
                                />
                            </button>
                        </div>
                    </div>

                </a>
            ))}
        </Masonry>

    )
}

export default Cards
