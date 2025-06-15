import React, { FC, ReactNode } from 'react'
import { ThemeProvider } from '@hooks/contexts/ThemeContext'
import { ProvidersProps } from '@interfaces/hooks/ProvidersProps'
import { BrowserRouter } from 'react-router-dom'
import { AlertProvider } from '@hooks/contexts/AlertContext'
import { UserProvider } from '@hooks/contexts/api/UserContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

const Providers: FC<ProvidersProps> = ({
    children
}): ReactNode => {
    return (
        <BrowserRouter>
            <GoogleOAuthProvider
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
            >
                <ThemeProvider>
                    <AlertProvider>
                        <UserProvider>
                            {children}
                        </UserProvider>
                    </AlertProvider>
                </ThemeProvider>
            </GoogleOAuthProvider>
        </BrowserRouter>
    )
}

export default Providers
