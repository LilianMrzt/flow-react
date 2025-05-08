import React, { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'

const ProjectDetailsScreen = (): ReactNode => {
    const {
        activeProjectSlug
    } = useProjects()

    if (!activeProjectSlug) return null

    return (
        <Navigate
            to={ProjectsRoutes.projectDetailsBoard.pathFn!({ slug: activeProjectSlug })}
            replace
        />
    )
}

export default ProjectDetailsScreen
