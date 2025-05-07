import React, { FC, ReactNode } from 'react'
import { ProjectProvider } from '@hooks/contexts/api/ProjectsContext'
import { ApiProvidersProps } from '@interfaces/hooks/ApiProvidersProps'

const ApiProviders: FC<ApiProvidersProps> = ({
    children
}): ReactNode => {
    return (
        <ProjectProvider>
            {children}
        </ProjectProvider>
    )
}

export default ApiProviders
