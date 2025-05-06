import React, { ReactNode } from 'react'
import './app.css'
import Drawer from '@ui/blocs/drawer/Drawer'
import Header from '@ui/blocs/header/Header'
import MainNavigation from '@ui/navigation/MainNavigation'

const App = (): ReactNode => {
    return (
        <div
            className={'app'}
        >
            <Drawer/>
            <main
                className={'main'}
            >
                <Header/>
                <MainNavigation/>
            </main>
        </div>
    )
}

export default App
