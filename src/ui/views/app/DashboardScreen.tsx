import React, { ReactNode, useEffect } from 'react'
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
import ActiveProjectsSection from '@ui/blocs/views/dashboard-screen/ActiveProjectsSection'
import { getUserProjectsAction } from '@api/ProjectsApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import Skeleton from '@components/layout/Skeleton'

const DashboardScreen = (): ReactNode => {
    const {
        projects,
        getProjectsStateUpdate,
        setHasFetchedOnceDashboardScreen,
        hasFetchedOnceDashboardScreen
    } = useProject()

    const {
        theme
    } = useTheme()

    const {
        showAlert
    } = useAlert()

    useEffect(() => {
        const fetchProjects = async (): Promise<void> => {
            await getUserProjectsAction()
                .then((res) => {
                    getProjectsStateUpdate(res)
                }).catch((error) => {
                    showAlert(error.message , 'error')
                }).finally(() => {
                    setTimeout(() => {
                        setHasFetchedOnceDashboardScreen(true)
                    }, 800)
                })
        }

        void fetchProjects()
    }, [])

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
                        Latest projects
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
                {!hasFetchedOnceDashboardScreen ? (
                    <div
                        className={'dashboard-screen-skeleton-container'}
                    >
                        {Array.from({ length: 4 }).map((_, i) => {
                            return (
                                <Skeleton
                                    key={i}
                                    width={'100%'}
                                    height={193}
                                />
                            )
                        })}
                    </div>
                ) : projects.length > 0 ? (
                    <ActiveProjectsSection />
                ) : (
                    <NoActiveProjectsSection />
                )}

            </Column>
        </Screen>
    )
}

export default DashboardScreen
