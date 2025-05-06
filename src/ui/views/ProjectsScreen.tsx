import React, { ReactNode } from 'react'
import Screen from '@components/layout/Screen'
import { AddIcon } from '@resources/Icons'

const ProjectsScreen = (): ReactNode => {
    return (
        <Screen
            label={'Projects'}
            description={'Access, manage and organize your projects'}
            buttonContent={{
                label: 'New project',
                icon: <AddIcon/>,
                onClick: () => {}
            }}
        >
            ProjectsScreen
        </Screen>
    )
}

export default ProjectsScreen
