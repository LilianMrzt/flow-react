import React, { FC, ReactNode } from 'react'
import { ProjectsProvider } from '@hooks/contexts/api/ProjectsContext'
import { ApiProvidersProps } from '@interfaces/hooks/ApiProvidersProps'

const ApiProviders: FC<ApiProvidersProps> = ({
    children
}): ReactNode => {
    return (
        <ProjectsProvider>
            {children}
        </ProjectsProvider>
    )
}

export default ApiProviders
