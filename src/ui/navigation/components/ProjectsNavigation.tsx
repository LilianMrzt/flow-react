import React, { ReactNode } from 'react'
import { Route } from 'react-router'
import ProjectsScreen from '@ui/views/app/ProjectsScreen'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import ProjectDetailsScreen from '@ui/views/app/ProjectDetailsScreen'

const ProjectsNavigation = (): ReactNode => {
    return (
        <Route>
            <Route
                path={ProjectsRoutes.projects.path}
                element={<ProjectsScreen />}
            />
            <Route
                path={ProjectsRoutes.projectDetails.path}
                element={<ProjectDetailsScreen />}
            />
        </Route>
    )
}

export default ProjectsNavigation
