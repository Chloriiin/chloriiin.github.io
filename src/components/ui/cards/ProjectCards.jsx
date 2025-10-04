"use client"
import React from 'react'
import WiggleElement from '../interactive/WiggleElement'
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1
}

const projects = [
    {
        title: "Digital Art Marketplace Platform",
        image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=400&h=300&fit=crop",
        description: "A revolutionary platform connecting digital artists with collectors worldwide, featuring NFT integration and community-driven curation.",
        tag: ["💻 Website", "Product Design", "Frontend Dev", "Blockchain", "Web3"],
        status: "In progress",
        clickable: false,
        href: null
    },
    {
        title: "AI-Powered Data Analytics Dashboard", 
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        description: "Advanced analytics platform utilizing machine learning to provide real-time insights and predictive modeling for business intelligence.",
        tag: ["📊 Data", "Machine Learning", "Analytics", "Python", "React", "TensorFlow"],
        status: "View Project",
        clickable: true,
        href: "#"
    },
    {
        title: "Sustainable Tech Startup Website",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop", 
        description: "Modern, eco-friendly website design for a clean energy startup, emphasizing sustainability and innovation in renewable technologies.",
        tag: ["💻 Website", "Next.js", "Frontend Dev", "Sustainability", "UX Design"],
        status: "View Project",
        clickable: true,
        href: "#"
    },
    {
        title: "Virtual Reality Experience Platform",
        image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=300&fit=crop",
        description: "Immersive VR platform for educational content delivery, featuring interactive 3D environments and collaborative learning spaces.",
        tag: ["🍎 Software", "VR/AR", "3D Graphics", "Unity", "WebXR"],
        status: "In Progress", 
        clickable: true,
        href: "#"
    },
    {
        title: "Interactive Storytelling Experience",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        description: "Immersive digital narratives that blend traditional storytelling with interactive media, creating unique user-driven experiences.",
        tag: ["🎨 Design", "Interactive Media", "Animation", "Creative Coding"],
        status: "In progress",
        clickable: false,
        href: null
    },
    {
        title: "Mobile Fitness Tracking App",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        description: "Comprehensive health and fitness application with personalized workout plans, nutrition tracking, and social features.",
        tag: ["📱 Mobile", "React Native", "Health Tech", "UI/UX", "API Integration"],
        status: "View Project",
        clickable: true, 
        href: "#"
    }
]

const ProjectCards = () => {
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
                    <div className="bg-[#000000] hover:bg-[#111111] active:bg-[#111111] focus:bg-[#111111] rounded-xl overflow-clip gap-2 grid pb-3">
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
                                    <span className="bg-[#1a1a1a] text-white text-[10px] p-1 rounded-sm">
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
                                <span className="h-1 w-1 bg-current rounded-full transform transition-transform duration-200 group-hover:translate-x-[3px]" />
                            </button>
                        </div>
                    </div>
                </a>
            ))}
        </Masonry>
    )
}

export default ProjectCards
