import React, { FC, ReactNode } from 'react'
import { LoadedProjectProvider } from '@hooks/contexts/api/LoadedProjectContext'
import { ProjectsDetailsApiProvidersProps } from '@interfaces/hooks/ProjectsDetailsApiProvidersProps'
import { WebSocketProvider } from '@hooks/contexts/api/WebSocketContext'
import { TasksProvider } from '@hooks/contexts/api/TasksProvider'
import { BoardColumnsProvider } from '@hooks/contexts/api/BoardColumnsProvider'

const ProjectsDetailsApiProviders: FC<ProjectsDetailsApiProvidersProps> = ({
    children
}): ReactNode => {
    return (
        <WebSocketProvider>
            <LoadedProjectProvider>
                <TasksProvider>
                    <BoardColumnsProvider>
                        {children}
                    </BoardColumnsProvider>
                </TasksProvider>
            </LoadedProjectProvider>
        </WebSocketProvider>
    )
}

export default ProjectsDetailsApiProviders
