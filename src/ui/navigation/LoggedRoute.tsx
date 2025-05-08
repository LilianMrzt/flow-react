import React, { type ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isTokenValid } from '@utils/AuthUtils'
import { AppRoutes } from '@constants/routes/AppRoutes'

const LoggedRoute = (): ReactElement => {
    const isAuthenticated = isTokenValid()

    if (isAuthenticated) {
        return (
            <Navigate
                to={AppRoutes.dashboard.path}
                replace
            />
        )
    }

    return (
        <Outlet />
    )
}

export default LoggedRoute
