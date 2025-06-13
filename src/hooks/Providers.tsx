import React, { FC, ReactNode } from 'react'
import { ThemeProvider } from '@hooks/contexts/ThemeContext'
import { ProvidersProps } from '@interfaces/hooks/ProvidersProps'
import { BrowserRouter } from 'react-router-dom'
import { AlertProvider } from '@hooks/contexts/AlertContext'
import { UserProvider } from '@hooks/contexts/api/UserContext'

const Providers: FC<ProvidersProps> = ({
    children
}): ReactNode => {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AlertProvider>
                    <UserProvider>
                        {children}
                    </UserProvider>
                </AlertProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default Providers
