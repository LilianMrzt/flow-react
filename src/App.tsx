import React, { ReactNode } from 'react'
import './app.css'
import Drawer from '@ui/blocs/drawer/Drawer'
import Header from '@ui/blocs/header/Header'
import MainNavigation from '@ui/navigation/MainNavigation'
import { useLocation } from 'react-router'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import LoginScreen from '@ui/views/LoginScreen'

const App = (): ReactNode => {
    const location = useLocation()
    return (
        <div
            className={'app'}
        >
            {location.pathname === AuthRoutes.signIn.path ? (
                <LoginScreen/>
            ) : (
                <>
                    <Drawer/>
                    <main
                        className={'main'}
                    >
                        <Header/>
                        <MainNavigation/>
                    </main>
                </>
            )}
        </div>
    )
}

export default App
