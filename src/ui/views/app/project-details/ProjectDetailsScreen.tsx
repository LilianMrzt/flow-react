import React, { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'

const ProjectDetailsScreen = (): ReactNode => {
    const {
        activeProjectKey
    } = useProjects()

    if (!activeProjectKey) return null

    return (
        <Navigate
            to={ProjectsRoutes.projectDetailsDashboard.pathFn!({ key: activeProjectKey })}
            replace
        />
    )
}

export default ProjectDetailsScreen
