import React, { ReactNode } from 'react'
import './app.css'
import MainNavigation from '@ui/navigation/MainNavigation'

const App = (): ReactNode => {
    return (
        <div
            className={'app'}
        >
            <MainNavigation/>
        </div>
    )
}

export default App
