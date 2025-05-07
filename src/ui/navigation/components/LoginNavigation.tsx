import React, { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import LoginScreen from '@ui/views/login/LoginScreen'
import RegisterScreen from '@ui/views/login/RegisterScreen'

const LoginNavigation = (): ReactNode => {
    return (
        <Routes>
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
                path={AuthRoutes.signIn.path}
                element={<LoginScreen />}
            />
            <Route
                path={AuthRoutes.register.path}
                element={<RegisterScreen />}
            />
        </Routes>
    )
}

export default LoginNavigation
