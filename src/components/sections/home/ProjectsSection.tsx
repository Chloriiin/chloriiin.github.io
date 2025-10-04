import React from 'react'
import ProjectCards from "../../ui/cards/ProjectCards";

const ProjectsSection: React.FC = () => {
    return (
        <section id="projects" className="p-5 pt-8">
            <h2 className="text-3xl font-bold text-white mb-8 pb-2 border-b border-[#2a2a2a] inline-block">Projects</h2>
            <ProjectCards />
        </section>
    )
}

export default ProjectsSection
