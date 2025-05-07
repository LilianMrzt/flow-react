import React, { ReactNode } from 'react'
import { Routes } from 'react-router'
import AppNavigation from '@ui/navigation/components/AppNavigation'
import LoginNavigation from '@ui/navigation/components/LoginNavigation'

const MainNavigation = (): ReactNode => {
    return (
        <Routes>
            <LoginNavigation/>
            <AppNavigation/>
        </Routes>
    )
}

export default MainNavigation
