import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Drawer from '@ui/blocs/drawer/Drawer'
import Header from '@ui/blocs/header/Header'
import './app-layout.css'

const AppLayout = (): ReactNode => {
    return (
        <>
            <Drawer />
            <main className={'main'}>
                <Header />
                <Outlet />
            </main>
        </>
    )
}

export default AppLayout
