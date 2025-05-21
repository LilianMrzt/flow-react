import React, { ReactNode } from 'react'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { Navigate } from 'react-router'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'

const ProjectDetailsSettingsScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    if (!loadedProject) return null

    return (
        <Navigate
            to={ProjectsRoutes.projectDetailsSettingsDetails.pathFn!({ slug: loadedProject.key })}
            replace
        />
    )
}

export default ProjectDetailsSettingsScreen
