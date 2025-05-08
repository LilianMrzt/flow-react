import React, { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'

const ProjectDetailsScreen = (): ReactNode => {
    const {
        slug
    } = useLoadedProject()

    if (!slug) return null

    return (
        <Navigate
            to={ProjectsRoutes.projectDetailsBoard.pathFn!({ slug: slug })}
            replace
        />
    )
}

export default ProjectDetailsScreen
