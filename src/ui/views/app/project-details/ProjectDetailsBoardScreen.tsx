import React, { ReactNode } from 'react'
import Screen from '@components/layout/Screen'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import './project-details-screen.css'
import BoardColumnsSection from '@ui/blocs/views/project-details/project-details-board-screen/BoardColumnsSection'

const ProjectDetailsBoardScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    if (!loadedProject) return null

    return (
        <Screen
            label={'Project Details'}
            description={'Project details and tasks'}
            className={'project-details-screen'}
        >
            <BoardColumnsSection/>
        </Screen>
    )
}

export default ProjectDetailsBoardScreen
