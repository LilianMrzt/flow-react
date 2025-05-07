import React, { FC, ReactNode } from 'react'
import { ProjectProvider } from '@hooks/contexts/api/ProjectsContext'
import { ApiProvidersProps } from '@interfaces/hooks/ApiProvidersProps'
import { UserProvider } from '@hooks/contexts/api/UserContext'

const ApiProviders: FC<ApiProvidersProps> = ({
    children
}): ReactNode => {
    return (
        <UserProvider>
            <ProjectProvider>
                {children}
            </ProjectProvider>
        </UserProvider>
    )
}

export default ApiProviders
