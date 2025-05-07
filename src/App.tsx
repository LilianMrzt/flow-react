import React, { ReactNode } from 'react'
import './app.css'
import MainNavigation from '@ui/navigation/MainNavigation'
import { useLocation } from 'react-router'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import LoginNavigation from '@ui/navigation/components/LoginNavigation'

const App = (): ReactNode => {
    const location = useLocation()

    const isInLoginLocation = location.pathname === AuthRoutes.signIn.path ||
        location.pathname === AuthRoutes.register.path

    return (
        <div
            className={'app'}
        >
            {isInLoginLocation ? (
                <LoginNavigation/>
            ) : (
                <MainNavigation/>
            )}
        </div>
    )
}

export default App
