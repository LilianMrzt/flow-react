import React, { ReactNode } from 'react'
import { Routes } from 'react-router'
import AppNavigation from '@ui/navigation/components/AppNavigation'

const MainNavigation = (): ReactNode => {
    return (
        <Routes>
            {AppNavigation()}
        </Routes>
    )
}

export default MainNavigation
