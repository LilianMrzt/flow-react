import React, { FC, ReactNode } from 'react'
import { ThemeProvider } from '@hooks/contexts/ThemeContext'
import { ProvidersProps } from '@interfaces/hooks/ProvidersProps'

const Providers: FC<ProvidersProps> = ({
    children
}): ReactNode => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    )
}

export default Providers
