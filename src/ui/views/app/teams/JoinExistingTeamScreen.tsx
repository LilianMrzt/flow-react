import React, { ReactNode, useState } from 'react'
import TextField from '@components/inputs/TextField'
import Button from '@components/buttons/Button'
import { joinTeamAction } from '@api/TeamApiCalls'
import { AppRoutes } from '@constants/routes/AppRoutes'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useUser } from '@hooks/contexts/api/UserContext'
import { useNavigate } from 'react-router-dom'
import Column from '@components/layout/Column'
import Card from '@components/layout/Card'
import Row from '@components/layout/Row'
import Icon from '@components/resources/Icon'
import { ConnectedHumansImage } from '@resources/Images'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/contexts/ThemeContext'
import SubTitle from '@components/text/SubTitle'
import BackgroundPlaceholderScreen from '@components/layout/background-placeholder-screen/BackgroundPlaceholderScreen'
import IconButton from '@components/buttons/IconButton'
import { LogoutIcon } from '@resources/Icons'
import './team-screens.css'

const JoinExistingTeamScreen = (): ReactNode => {
    const [teamJoinCode, setTeamJoinCode] = useState('')
    const { showAlert } = useAlert()
    const { setUser, logout } = useUser()
    const { theme } = useTheme()

    const navigate = useNavigate()

    const handleJoinTeam = (): void => {
        if(!teamJoinCode) {
            showAlert('Team join code cannot be empty.' , 'warning')
            return
        }

        joinTeamAction(teamJoinCode)
            .then((res) => {
                setUser(prev => {
                    if (!prev) return prev

                    return {
                        ...prev,
                        memberships: [
                            ...prev.memberships,
                            {
                                id: res.id,
                                team: res,
                                role: 'member'
                            }
                        ]
                    }
                })
                navigate(AppRoutes.dashboard.path)
            }).catch(err => {
                showAlert(err.message, 'error')
            })
    }

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
                                Join your team
                            </SubTitle>
                            <Text
                                color={theme.primary}
                            >
                                Enter the invitation code you received to join your team on Flow.
                            </Text>
                            <Text>
                                {'Once you\'re in, you\'ll be able to collaborate on projects and stay in sync with your teammates.'}
                            </Text>
                        </Column>
                        <TextField
                            inputValue={teamJoinCode}
                            setInputValue={setTeamJoinCode}
                            placeholder={'•••••••••••••••••••••'}
                        />
                        <Button
                            onClick={handleJoinTeam}
                            label={'Join a team'}
                            width={'100%'}
                        />
                        <Row>
                            <Text
                                fontSize={14}
                                color={theme.textSecondary}
                            >
                                Changed your mind?
                            </Text>
                            <Button
                                fontSize={14}
                                onClick={() => {
                                    navigate(AppRoutes.noTeamFound.path)
                                }}
                                label={'Go back'}
                                backgroundColor={theme.surface}
                                color={theme.primary}
                                hoverBackgroundColor={theme.secondary}
                                borderColor={theme.surface}
                            />
                        </Row>
                    </Column>
                    <Icon
                        size={400}
                    >
                        <ConnectedHumansImage/>
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
                    >
                        <LogoutIcon/>
                    </IconButton>
                </div>
            </Card>
        </BackgroundPlaceholderScreen>
    )
}

export default JoinExistingTeamScreen
