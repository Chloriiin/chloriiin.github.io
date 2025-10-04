"use client"
import React from 'react'
import WiggleElement from '../interactive/WiggleElement'
import Masonry from 'react-masonry-css'

interface Project {
    title: string
    image: string
    description: string
    tag: string[]
    status: string
    clickable: boolean
    href: string | null
}

interface ProjectCardsProps {
    projects?: Project[]
}

const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1
}

const ProjectCards: React.FC<ProjectCardsProps> = ({ projects }) => {
    const defaultProjects: Project[] = [
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
            tag: ["💻 Website", "Data Science", "React", "Python", "Machine Learning"],
            status: "View Project",
            clickable: true,
            href: "#"
        },
        {
            title: "Sustainable E-commerce Platform",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
            description: "Eco-friendly online marketplace promoting sustainable products with carbon footprint tracking and environmental impact metrics.",
            tag: ["💻 Website", "E-commerce", "Sustainability", "Next.js", "Full-stack"],
            status: "Coming Soon",
            clickable: false,
            href: null
        },
        {
            title: "Mental Health & Wellness App",
            image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=300&fit=crop",
            description: "Comprehensive health and fitness application with personalized workout plans, nutrition tracking, and social features.",
            tag: ["📱 Mobile", "React Native", "Health Tech", "UI/UX", "API Integration"],
            status: "View Project",
            clickable: true,
            href: "#"
        }
    ]

    const projectsToRender = projects || defaultProjects

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-6"
            columnClassName="space-y-6"
        >
            {projectsToRender.map((project, index) => (
                <WiggleElement key={index}>
                    {project.clickable && project.href ? (
                        <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden hover:border-[#444] transition-all duration-300 group"
                        >
                            <ProjectCard project={project} />
                        </a>
                    ) : (
                        <div className="bg-[#1a1a1a] border border-[#333] rounded-lg overflow-hidden">
                            <ProjectCard project={project} />
                        </div>
                    )}
                </WiggleElement>
            ))}
        </Masonry>
    )
}

interface ProjectCardProps {
    project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
    <>
        <div className="aspect-video overflow-hidden">
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
                {project.tag.map((tag, tagIndex) => (
                    <span
                        key={tagIndex}
                        className="px-2 py-1 bg-[#2a2a2a] text-gray-300 text-xs rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${
                    project.status === "View Project" 
                        ? "text-green-400" 
                        : project.status === "In progress"
                        ? "text-yellow-400"
                        : "text-gray-400"
                }`}>
                    {project.status}
                </span>
                {project.clickable && (
                    <span className="text-xs text-gray-500 group-hover:text-gray-400">
                        Click to view →
                    </span>
                )}
            </div>
        </div>
    </>
)

export default ProjectCards
