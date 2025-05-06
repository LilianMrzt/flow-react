import React, { ReactNode } from 'react'
import './app.css'
import Header from '@ui/blocs/header/Header'

const App = (): ReactNode => {
    return (
        <div
            className={'app'}
        >
            <Header/>
            <main>

            </main>
        </div>
    )
}

export default App
