import React, { ReactNode } from 'react'
import { Route } from 'react-router'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { ProjectDetailsSettingsRoutes } from '@constants/routes/ProjectDetailsSettingsRoutes'
import ProjectDetailsSettingsDetailsScreen
    from '@ui/views/app/project-details/project-settings/ProjectDetailsSettingsDetailsScreen'
import ProjectDetailsSettingsAccessScreen
    from '@ui/views/app/project-details/project-settings/ProjectDetailsSettingsAccessScreen'
import ProjectDetailsSettingsBoardScreen
    from '@ui/views/app/project-details/project-settings/ProjectDetailsSettingsBoardScreen'
import ProjectDetailsSettingsWorkflowScreen
    from '@ui/views/app/project-details/project-settings/ProjectDetailsSettingsWorkflowScreen'
import ProjectDetailsSettingsDangerZoneScreen
    from '@ui/views/app/project-details/project-settings/ProjectDetailsSettingsDangerZoneScreen'
import ProjectDetailsSettingsScreen from '@ui/views/app/project-details/project-settings/ProjectDetailsSettingsScreen'
import { Outlet } from 'react-router-dom'

const ProjectSettingsNavigation = (): ReactNode => {
    return (
        <Route
            path={ProjectsRoutes.projectDetailsSettings.path}
            element={
                <Outlet/>
            }
        >
            <Route
                index
                element={<ProjectDetailsSettingsScreen />}
            />
            <Route
                path={ProjectDetailsSettingsRoutes.projectDetailsSettingsDetails.path}
                element={<ProjectDetailsSettingsDetailsScreen />}
            />
            <Route
                path={ProjectDetailsSettingsRoutes.projectDetailsSettingsAccess.path}
                element={<ProjectDetailsSettingsAccessScreen />}
            />
            <Route
                path={ProjectDetailsSettingsRoutes.projectDetailsSettingsBoard.path}
                element={<ProjectDetailsSettingsBoardScreen />}
            />
            <Route
                path={ProjectDetailsSettingsRoutes.projectDetailsSettingsWorkflow.path}
                element={<ProjectDetailsSettingsWorkflowScreen />}
            />
            <Route
                path={ProjectDetailsSettingsRoutes.projectDetailsSettingsDangerZone.path}
                element={<ProjectDetailsSettingsDangerZoneScreen />}
            />
        </Route>
    )
}

export default ProjectSettingsNavigation
