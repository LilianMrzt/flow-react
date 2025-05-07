import React, { type ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isTokenValid } from '@utils/AuthUtils'
import { AuthRoutes } from '@constants/routes/AuthRoutes'

const ProtectedRoute = (): ReactElement => {
    const isAuthenticated = isTokenValid()

    if (!isAuthenticated) {
        return (
            <Navigate
                to={AuthRoutes.signIn.path}
                replace
            />
        )
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute
