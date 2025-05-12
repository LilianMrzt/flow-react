import React, { ReactNode } from 'react'
import Screen from '@components/layout/screen/Screen'
import Text from '@components/text/Text'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { PROJECT_DETAILS_SETTINGS_BREADCRUMBS } from '@constants/breadcrumbs/ProjectDetailsSettingsBreadcrumbs'

const ProjectDetailsSettingsWorkflowScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    if (!loadedProject) return null

    return (
        <Screen
            label={'ProjectDetailsSettingsWorkflowScreen'}
            description={'WorkFlow'}
            breadCrumbsRoutes={PROJECT_DETAILS_SETTINGS_BREADCRUMBS(loadedProject)}
        >
            <Text>
                {loadedProject.name}
            </Text>
        </Screen>
    )
}

export default ProjectDetailsSettingsWorkflowScreen
