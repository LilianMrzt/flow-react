import React, { ReactNode } from 'react'
import { Route } from 'react-router'
import ProjectsScreen from '@ui/views/app/ProjectsScreen'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import ProjectDetailsBoardScreen from '@ui/views/app/project-details/ProjectDetailsBoardScreen'
import ProjectDetailsScreen from '@ui/views/app/project-details/ProjectDetailsScreen'
import { Outlet } from 'react-router-dom'
import ProjectDetailsDashboardScreen from '@ui/views/app/project-details/ProjectDetailsDashboardScreen'
import ProjectDetailsBacklogScreen from '@ui/views/app/project-details/ProjectDetailsBacklogScreen'
import ProjectsDetailsApiProviders from '@hooks/ProjectsDetailsApiProviders'
import ProjectNotFoundScreen from '@ui/views/error-404/ProjectNotFoundScreen'
import ProjectSettingsNavigation from '@ui/navigation/components/ProjectSettingsNavigation'

const ProjectsNavigation = (): ReactNode => {
    return (
        <Route>
            <Route
                path={ProjectsRoutes.projects.path}
                element={<ProjectsScreen />}
            />
            <Route
                path={ProjectsRoutes.projectDetails.path}
                element={
                    <ProjectsDetailsApiProviders>
                        <Outlet/>
                    </ProjectsDetailsApiProviders>
                }
            >
                <Route
                    index
                    element={<ProjectDetailsScreen />}
                />
                <Route
                    path={ProjectsRoutes.projectDetailsDashboard.path}
                    element={<ProjectDetailsDashboardScreen />}
                />
                <Route
                    path={ProjectsRoutes.projectDetailsBoard.path}
                    element={<ProjectDetailsBoardScreen />}
                />
                <Route
                    path={ProjectsRoutes.projectDetailsBacklog.path}
                    element={<ProjectDetailsBacklogScreen />}
                />
                {ProjectSettingsNavigation()}
            </Route>
            <Route
                path={ProjectsRoutes.projectNotFound.path}
                element={<ProjectNotFoundScreen />}
            />
        </Route>
    )
}

export default ProjectsNavigation
