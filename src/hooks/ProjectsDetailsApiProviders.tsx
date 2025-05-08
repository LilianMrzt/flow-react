import React, { FC, ReactNode } from 'react'
import { LoadedProjectProvider } from '@hooks/contexts/api/LoadedProjectContext'
import { ProjectsDetailsApiProvidersProps } from '@interfaces/hooks/ProjectsDetailsApiProvidersProps'
import { WebSocketProvider } from '@hooks/contexts/api/WebSocketContext'

const ProjectsDetailsApiProviders: FC<ProjectsDetailsApiProvidersProps> = ({
    children
}): ReactNode => {
    return (
        <WebSocketProvider>
            <LoadedProjectProvider>
                {children}
            </LoadedProjectProvider>
        </WebSocketProvider>
    )
}

export default ProjectsDetailsApiProviders
