import React, { ReactNode } from 'react'
import Screen from '@components/layout/Screen'
import { useProject } from '@hooks/contexts/api/ProjectsContext'
import NoActiveProjectsSection from '@ui/blocs/views/dashboard-screen/NoActiveProjectsSection'
import SubTitle from '@components/text/SubTitle'
import Column from '@components/layout/Column'
import './dashboard-screen.css'
import DashboardCard from '@ui/blocs/views/dashboard-screen/DashboardCard'
import { ChartIcon, CircleCheckIcon, ClockIcon, ListTodoIcon } from '@resources/Icons'
import { IconColors } from '@constants/themes/IconColors'
import Row from '@components/layout/Row'
import Button from '@components/buttons/Button'
import { useNavigate } from 'react-router-dom'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { useTheme } from '@hooks/contexts/ThemeContext'

const DashboardScreen = (): ReactNode => {
    const {
        projects
    } = useProject()

    const {
        theme
    } = useTheme()

    const navigate = useNavigate()

    return (
        <Screen
            label={'Dashboard'}
            description={'Your projects and task overview'}
        >
            <div
                className={'dashboard-screen-cards-container'}
            >
                <DashboardCard
                    label={'Total Tasks'}
                    value={0}
                    icon={<ListTodoIcon/>}
                    iconColor={IconColors.blue}
                />
                <DashboardCard
                    label={'Completed'}
                    value={0}
                    icon={<CircleCheckIcon/>}
                    iconColor={IconColors.green}
                />
                <DashboardCard
                    label={'In Progress'}
                    value={0}
                    icon={<ClockIcon/>}
                    iconColor={IconColors.yellow}
                />
                <DashboardCard
                    label={'Completion Rate'}
                    value={'0%'}
                    icon={<ChartIcon/>}
                    iconColor={IconColors.purple}
                />
            </div>
            <Column
                height={'fit-content'}
                gap={4}
                alignItems={'flex-start'}
            >
                <Row
                    width={'100%'}
                    justifyContent={'space-between'}
                >
                    <SubTitle
                        fontSize={20}
                    >
                        Active projects
                    </SubTitle>
                    <Button
                        label={'View all'}
                        onClick={() => {
                            navigate(ProjectsRoutes.projects.path)
                        }}
                        backgroundColor={theme.background}
                        color={theme.primary}
                        borderColor={theme.background}
                        hoverBackgroundColor={theme.secondary}
                    />
                </Row>
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
