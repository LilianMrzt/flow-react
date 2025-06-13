import React, { ReactNode } from 'react'
import { Navigate, Route } from 'react-router'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import LoginScreen from '@ui/views/login/LoginScreen'
import RegisterScreen from '@ui/views/login/RegisterScreen'
import LoggedRoute from '@ui/navigation/LoggedRoute'

const AuthNavigation = (): ReactNode => {
    return (
        <>
            <Route
                path={'/'}
                element={
                    <Navigate
                        to={AuthRoutes.signIn.path}
                        replace
                    />
                }
            />
            <Route
                element={<LoggedRoute/>}
            >
                <Route
                    path={AuthRoutes.signIn.path}
                    element={<LoginScreen />}
                />
                <Route
                    path={AuthRoutes.register.path}
                    element={<RegisterScreen />}
                />
            </Route>
        </>
    )
}

export default AuthNavigation
