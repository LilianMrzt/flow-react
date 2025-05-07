import React, { ReactNode } from 'react'
import ProtectedRoute from '@ui/navigation/ProtectedRoute'
import { Navigate, Route } from 'react-router'
import { DrawerRoutes } from '@constants/routes/DrawerRoutes'
import DashboardScreen from '@ui/views/DashboardScreen'
import ProjectsScreen from '@ui/views/ProjectsScreen'
import TeamsScreen from '@ui/views/TeamsScreen'
import SettingsScreen from '@ui/views/SettingsScreen'

const AppNavigation = (): ReactNode => {
    return (
        <Route
            element={<ProtectedRoute/>}
        >
            <Route
                path={'/'}
                element={
                    <Navigate
                        to={DrawerRoutes.dashboard.path}
                        replace
                    />
                }
            />
            <Route
                path={DrawerRoutes.dashboard.path}
                element={<DashboardScreen />}
            />
            <Route
                path={DrawerRoutes.projects.path}
                element={<ProjectsScreen />}
            />
            <Route
                path={DrawerRoutes.teams.path}
                element={<TeamsScreen />}
            />
            <Route
                path={DrawerRoutes.settings.path}
                element={<SettingsScreen />}
            />
        </Route>
    )
}

export default AppNavigation
