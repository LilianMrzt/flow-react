import React, { type ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isTokenValid } from '@utils/AuthUtils'
import { DrawerRoutes } from '@constants/routes/DrawerRoutes'

const LoggedRoute = (): ReactElement => {
    const isAuthenticated = isTokenValid()

    if (isAuthenticated) {
        return (
            <Navigate
                to={DrawerRoutes.dashboard.path}
                replace
            />
        )
    }

    return (
        <Outlet />
    )
}

export default LoggedRoute
