import React, { ReactNode } from 'react'
import { Navigate, Route } from 'react-router'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import LoginScreen from '@ui/views/auth/LoginScreen'
import RegisterScreen from '@ui/views/auth/RegisterScreen'
import LoggedRoute from '@ui/navigation/LoggedRoute'
import ForgotPasswordScreen from '@ui/views/auth/ForgotPasswordScreen'
import ResetPasswordScreen from '@ui/views/auth/ResetPasswordScreen'
import VerifyEmailScreen from '@ui/views/auth/VerifyEmailScreen'
import AccountCreatedScreen from '@ui/views/auth/AccountCreatedScreen'

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
                <Route
                    path={AuthRoutes.forgotPassword.path}
                    element={<ForgotPasswordScreen />}
                />
                <Route
                    path={AuthRoutes.resetPassword.path}
                    element={<ResetPasswordScreen />}
                />
                <Route
                    path={AuthRoutes.verifyEmail.path}
                    element={<VerifyEmailScreen />}
                />
                <Route
                    path={AuthRoutes.accountCreated.path}
                    element={<AccountCreatedScreen />}
                />
            </Route>
        </>
    )
}

export default AuthNavigation
