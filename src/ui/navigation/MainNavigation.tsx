import React, { ReactNode } from 'react'
import { Routes } from 'react-router'
import AppNavigation from '@ui/navigation/components/AppNavigation'
import AuthNavigation from '@ui/navigation/components/AuthNavigation'

const MainNavigation = (): ReactNode => {
    return (
        <Routes>
            {AuthNavigation()}
            {AppNavigation()}
        </Routes>
    )
}

export default MainNavigation
