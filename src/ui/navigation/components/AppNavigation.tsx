import React, { ReactNode } from 'react'
import ProtectedRoute from '@ui/navigation/ProtectedRoute'
import { Navigate, Route } from 'react-router'
import DashboardScreen from '@ui/views/app/DashboardScreen'
import TeamsScreen from '@ui/views/app/TeamsScreen'
import SettingsScreen from '@ui/views/app/SettingsScreen'
import AppLayout from '@ui/navigation/AppLayout'
import ProjectsNavigation from '@ui/navigation/components/ProjectsNavigation'
import { AppRoutes } from '@constants/routes/AppRoutes'
import ProfileScreen from '@ui/views/app/ProfileScreen'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import ProjectNotFoundScreen from '@ui/views/error-404/ProjectNotFoundScreen'
import Error404PageNotFoundScreen from '@ui/views/error-404/Error404PageNotFoundScreen'

const AppNavigation = (): ReactNode => {
    return (
        <Route
            element={<ProtectedRoute/>}
        >
            <Route
                element={<AppLayout/>}
            >
                <Route
                    path={'/'}
                    element={
                        <Navigate
                            to={AppRoutes.dashboard.path}
                            replace
                        />
                    }
                />
                <Route
                    path={AppRoutes.dashboard.path}
                    element={<DashboardScreen />}
                />
                {ProjectsNavigation()}
                <Route
                    path={AppRoutes.teams.path}
                    element={<TeamsScreen />}
                />
                <Route
                    path={AppRoutes.settings.path}
                    element={<SettingsScreen />}
                />
                <Route
                    path={AppRoutes.profile.path}
                    element={<ProfileScreen />}
                />
                <Route
                    path={ProjectsRoutes.projectNotFound.path}
                    element={<ProjectNotFoundScreen />}
                />
                <Route
                    path={'*'}
                    element={<Error404PageNotFoundScreen />}
                />
            </Route>
        </Route>
    )
}

export default AppNavigation
