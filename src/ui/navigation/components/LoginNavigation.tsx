import React, { ReactNode } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import LoginScreen from '@ui/views/login/LoginScreen'
import RegisterScreen from '@ui/views/login/RegisterScreen'
import LoggedRoute from '@ui/navigation/LoggedRoute'

const LoginNavigation = (): ReactNode => {
    return (
        <Routes>
            <Route
                element={<LoggedRoute/>}
            >
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
            </Route>
        </Routes>
    )
}

export default LoginNavigation
