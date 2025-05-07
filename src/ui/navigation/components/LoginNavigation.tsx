import React, { ReactNode } from 'react'
import { Route } from 'react-router'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import LoginScreen from '@ui/views/LoginScreen'

const LoginNavigation = (): ReactNode => {
    return (
        <Route>
            <Route
                path={AuthRoutes.signIn.path}
                element={<LoginScreen />}
            />
        </Route>
    )
}

export default LoginNavigation
