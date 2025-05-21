import React, { ReactNode } from 'react'
import './active-projects-section.css'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'
import ProjectCard from '@ui/blocs/views/projects-screen/ProjectCard'

const ActiveProjectsSection = (): ReactNode => {
    const {
        recentProjects
    } = useProjects()

    return (
        <div
            className={'active-projects-section'}
        >
            {recentProjects.map((project) => {
                return (
                    <ProjectCard
                        key={project.key}
                        project={project}
                    />
                )
            })}
        </div>
    )
}

export default ActiveProjectsSection
