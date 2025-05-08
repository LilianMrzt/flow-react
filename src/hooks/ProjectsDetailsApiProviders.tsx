import React, { FC, ReactNode } from 'react'
import { LoadedProjectProvider } from '@hooks/contexts/api/LoadedProjectContext'
import { ProjectsDetailsApiProvidersProps } from '@interfaces/hooks/ProjectsDetailsApiProvidersProps'

const ProjectsDetailsApiProviders: FC<ProjectsDetailsApiProvidersProps> = ({
    children
}): ReactNode => {
    return (
        <LoadedProjectProvider>
            {children}
        </LoadedProjectProvider>
    )
}

export default ProjectsDetailsApiProviders
