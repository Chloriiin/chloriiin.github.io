"use client"
import React from 'react'
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
            title: "Thermal Shift Assays in R (TSAR)",
            image: "https://raw.githubusercontent.com/Chloriiin/TSAR/main/vignettes/images/TSAR_logo.png",
            description: "Bioconductor package delivering Shiny workflows that streamline thermal shift assay preprocessing, curve modeling, and visualization directly inside R.",
            tag: ["R Package", "Shiny", "Bioconductor"],
            status: "View Project",
            clickable: true,
            href: "https://github.com/Chloriiin/TSAR"
        },
        {
            title: "Protrace",
            image: "https://raw.githubusercontent.com/Chloriiin/Protrace/main/src-tauri/icons/Square310x310Logo.png",
            description: "Offline Tauri desktop app with Python backend for multi-well microplate reader analysis.",
            tag: ["Desktop App", "Data Visualization", "Next.js", "Python", "Tauri"],
            status: "In Progress",
            clickable: true,
            href: "https://github.com/Chloriiin/Protrace"
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
                <div key={index}>
                    {project.clickable && project.href ? (
                        <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-[#000000] rounded-lg overflow-hidden transition-all duration-300 group"
                        >
                            <ProjectCard project={project} />
                        </a>
                    ) : (
                        <div className="bg-[#000000] rounded-lg overflow-hidden">
                            <ProjectCard project={project} />
                        </div>
                    )}
                </div>
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
