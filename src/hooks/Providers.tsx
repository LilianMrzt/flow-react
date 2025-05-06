import React, { FC, ReactNode } from 'react'
import { ThemeProvider } from '@hooks/contexts/ThemeContext'
import { ProvidersProps } from '@interfaces/hooks/ProvidersProps'
import { BrowserRouter } from 'react-router-dom'

const Providers: FC<ProvidersProps> = ({
    children
}): ReactNode => {
    return (
        <BrowserRouter>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default Providers
