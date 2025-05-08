import React, { ReactNode } from 'react'
import Screen from '@components/layout/Screen'
import { useProject } from '@hooks/contexts/api/ProjectsContext'
import NoActiveProjectsSection from '@ui/blocs/views/dashboard-screen/NoActiveProjectsSection'
import SubTitle from '@components/text/SubTitle'
import Column from '@components/layout/Column'

const DashboardScreen = (): ReactNode => {
    const {
        projects
    } = useProject()

    return (
        <Screen
            label={'Dashboard'}
            description={'Your projects and task overview'}
        >
            <Column
                height={'fit-content'}
                gap={16}
                alignItems={'flex-start'}
            >
                <SubTitle
                    fontSize={20}
                >
                    Active projects
                </SubTitle>
                {projects.length > 0 ? (
                    <div/>
                ) : (
                    <NoActiveProjectsSection/>
                )}
            </Column>
        </Screen>
    )
}

export default DashboardScreen
