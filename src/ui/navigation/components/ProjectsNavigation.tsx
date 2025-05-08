import React, { ReactNode } from 'react'
import { Route } from 'react-router'
import ProjectsScreen from '@ui/views/app/ProjectsScreen'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import ProjectDetailsBoardScreen from '@ui/views/app/project-details/ProjectDetailsBoardScreen'
import ProjectDetailsScreen from '@ui/views/app/project-details/ProjectDetailsScreen'
import { LoadedProjectProvider } from '@hooks/contexts/api/LoadedProjectContext'
import { Outlet } from 'react-router-dom'
import ProjectDetailsSettingsScreen from '@ui/views/app/project-details/ProjectDetailsSettingsScreen'
import ProjectDetailsDashboardScreen from '@ui/views/app/project-details/ProjectDetailsDashboardScreen'
import ProjectDetailsBacklogScreen from '@ui/views/app/project-details/ProjectDetailsBacklogScreen'

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
                    <LoadedProjectProvider>
                        <Outlet/>
                    </LoadedProjectProvider>
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
                <Route
                    path={ProjectsRoutes.projectDetailsSettings.path}
                    element={<ProjectDetailsSettingsScreen />}
                />
            </Route>
        </Route>
    )
}

export default ProjectsNavigation
