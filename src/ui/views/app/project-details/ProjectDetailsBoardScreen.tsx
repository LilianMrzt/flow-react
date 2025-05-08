import React, { ReactNode } from 'react'
import Screen from '@components/layout/Screen'
import Text from '@components/text/Text'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'

const ProjectDetailsBoardScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    if (!loadedProject) return null

    return (
        <Screen
            label={'Project Details'}
            description={'Project details and tasks'}
        >
            <Text>
                {loadedProject.name}
            </Text>
            <Text>
                {loadedProject.description}
            </Text>
        </Screen>
    )
}

export default ProjectDetailsBoardScreen
