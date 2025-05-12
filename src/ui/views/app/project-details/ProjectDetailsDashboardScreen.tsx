import React, { ReactNode } from 'react'
import Screen from '@components/layout/screen/Screen'
import Text from '@components/text/Text'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { PROJECT_DETAILS_BREADCRUMBS } from '@constants/breadcrumbs/ProjectDetailsBreadcrumbs'

const ProjectDetailsDashboardScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    if (!loadedProject) return null

    return (
        <Screen
            label={'Project Dashboard'}
            description={'Dashboard'}
            breadCrumbsRoutes={PROJECT_DETAILS_BREADCRUMBS(loadedProject)}
        >
            <Text>
                {loadedProject.name}
            </Text>
        </Screen>
    )
}

export default ProjectDetailsDashboardScreen
