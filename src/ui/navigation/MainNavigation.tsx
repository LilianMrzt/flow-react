import React, { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { DrawerRoutes } from '@constants/routes/DrawerRoutes'

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
                element={<div />}
            />
            <Route
                path={DrawerRoutes.projects.path}
                element={<div />}
            />
        </Routes>
    )
}

export default MainNavigation
