import React, { ReactNode } from 'react'
import ProtectedRoute from '@ui/navigation/ProtectedRoute'
import { Navigate, Route } from 'react-router'
import { DrawerRoutes } from '@constants/routes/DrawerRoutes'
import DashboardScreen from '@ui/views/app/DashboardScreen'
import TeamsScreen from '@ui/views/app/TeamsScreen'
import SettingsScreen from '@ui/views/app/SettingsScreen'
import AppLayout from '@ui/navigation/AppLayout'
import ProjectsNavigation from '@ui/navigation/components/ProjectsNavigation'
import { AppRoutes } from '@constants/routes/AppRoutes'
import ProfileScreen from '@ui/views/app/ProfileScreen'

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
                            to={DrawerRoutes.dashboard.path}
                            replace
                        />
                    }
                />
                <Route
                    path={DrawerRoutes.dashboard.path}
                    element={<DashboardScreen />}
                />
                {ProjectsNavigation()}
                <Route
                    path={DrawerRoutes.teams.path}
                    element={<TeamsScreen />}
                />
                <Route
                    path={DrawerRoutes.settings.path}
                    element={<SettingsScreen />}
                />
                <Route
                    path={AppRoutes.profile.path}
                    element={<ProfileScreen />}
                />
            </Route>
        </Route>
    )
}

export default AppNavigation
