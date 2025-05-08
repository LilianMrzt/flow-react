import React, { FC, ReactNode } from 'react'
import { ProjectsProvider } from '@hooks/contexts/api/ProjectsContext'
import { ApiProvidersProps } from '@interfaces/hooks/ApiProvidersProps'
import { UserProvider } from '@hooks/contexts/api/UserContext'

const ApiProviders: FC<ApiProvidersProps> = ({
    children
}): ReactNode => {
    return (
        <UserProvider>
            <ProjectsProvider>
                {children}
            </ProjectsProvider>
        </UserProvider>
    )
}

export default ApiProviders
