import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Drawer from '@ui/blocs/drawer/Drawer'
import Header from '@ui/blocs/header/Header'
import './app-layout.css'
import ApiProviders from '@hooks/ApiProviders'

const AppLayout = (): ReactNode => {
    return (
        <ApiProviders>
            <div
                className={'main-wrapper'}
            >
                <Drawer />
                <main className={'main'}>
                    <Header />
                    <Outlet />
                </main>
            </div>
        </ApiProviders>
    )
}

export default AppLayout
