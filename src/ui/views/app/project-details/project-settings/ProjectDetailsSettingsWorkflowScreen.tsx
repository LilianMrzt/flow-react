import React, { ReactNode } from 'react'
import Screen from '@components/layout/Screen'
import Text from '@components/text/Text'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'

const ProjectDetailsSettingsWorkflowScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    if (!loadedProject) return null

    return (
        <Screen
            label={'ProjectDetailsSettingsWorkflowScreen'}
            description={'WorkFlow'}
        >
            <Text>
                {loadedProject.name}
            </Text>
        </Screen>
    )
}

export default ProjectDetailsSettingsWorkflowScreen
