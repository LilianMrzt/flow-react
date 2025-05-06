import React, { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { DrawerRoutes } from '@constants/routes/DrawerRoutes'
import DashboardScreen from '@ui/views/DashboardScreen'
import ProjectsScreen from '@ui/views/ProjectsScreen'

const MainNavigation = (): ReactNode => {
    return (
        <Routes>
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
        </Routes>
    )
}

export default MainNavigation
