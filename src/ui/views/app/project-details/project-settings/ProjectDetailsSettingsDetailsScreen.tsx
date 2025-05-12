import React, { ReactNode } from 'react'
import Screen from '@components/layout/screen/Screen'
import Text from '@components/text/Text'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { PROJECT_DETAILS_SETTINGS_BREADCRUMBS } from '@constants/breadcrumbs/ProjectDetailsSettingsBreadcrumbs'

const ProjectDetailsSettingsDetailsScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    if (!loadedProject) return null

    return (
        <Screen
            label={'ProjectDetailsSettingsDetailsScreen'}
            description={'Details'}
            breadCrumbsRoutes={PROJECT_DETAILS_SETTINGS_BREADCRUMBS(loadedProject)}
        >
            <Text>
                {loadedProject.name}
            </Text>
        </Screen>
    )
}

export default ProjectDetailsSettingsDetailsScreen
