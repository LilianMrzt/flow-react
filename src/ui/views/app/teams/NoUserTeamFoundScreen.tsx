import React, { ReactNode } from 'react'
import Button from '@components/buttons/Button'
import Text from '@components/text/Text'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '@constants/routes/AppRoutes'
import Column from '@components/layout/Column'
import Card from '@components/layout/Card'
import SubTitle from '@components/text/SubTitle'
import Row from '@components/layout/Row'
import Icon from '@components/resources/Icon'
import { CoworkingHumansImage } from '@resources/Images'
import { AddIcon, JoinIcon, LogoutIcon } from '@resources/Icons'
import { useTheme } from '@hooks/contexts/ThemeContext'
import BackgroundPlaceholderScreen from '@components/layout/background-placeholder-screen/BackgroundPlaceholderScreen'
import IconButton from '@components/buttons/IconButton'
import { useUser } from '@hooks/contexts/api/UserContext'
import './team-screens.css'

const NoUserTeamFoundScreen = (): ReactNode => {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const { logout } = useUser()

    return (
        <BackgroundPlaceholderScreen>
            <Card
                maxWidth={800}
                padding={24}
            >
                <Row>
                    <Column
                        gap={16}
                    >
                        <Column
                            alignItems={'start'}
                            height={'fit-content'}
                        >
                            <SubTitle>
                                Welcome to Flow
                            </SubTitle>
                            <Text
                                color={theme.primary}
                            >
                                To get started with Flow, you need to be part of a team.
                            </Text>
                            <Text>
                                Teams help you collaborate and manage your projects more effectively.
                            </Text>
                            <Text>
                                You can either create a new team or join an existing one.
                            </Text>
                        </Column>
                        <Column
                            height={'fit-content'}
                        >
                            <Button
                                onClick={() => {
                                    navigate(AppRoutes.createNewTeam.path)
                                }}
                                label={'Create a new team'}
                                icon={<AddIcon/>}
                                width={'100%'}
                            />
                            <Text>
                                or
                            </Text>
                            <Button
                                onClick={() => {
                                    navigate(AppRoutes.joinExistingTeam.path)
                                }}
                                label={'Join an existing Team'}
                                icon={<JoinIcon/>}
                                width={'100%'}
                            />
                        </Column>
                    </Column>
                    <Icon
                        size={400}
                    >
                        <CoworkingHumansImage/>
                    </Icon>
                </Row>
                <div
                    className={'team-disconnect-button'}
                >
                    <IconButton
                        onClick={logout}
                        backgroundColor={theme.surface}
                        hoverBackgroundColor={theme.tertiary}
                        hoverColor={theme.hoverError}
                        color={theme.textSecondary}
                    >
                        <LogoutIcon/>
                    </IconButton>
                </div>
            </Card>
        </BackgroundPlaceholderScreen>
    )
}

export default NoUserTeamFoundScreen
