import React, { ReactNode, useState } from 'react'
import TextField from '@components/inputs/TextField'
import Button from '@components/buttons/Button'
import { AppRoutes } from '@constants/routes/AppRoutes'
import { useNavigate } from 'react-router-dom'
import { createTeamAction } from '@api/TeamApiCalls'
import { useUser } from '@hooks/contexts/api/UserContext'
import { useAlert } from '@hooks/contexts/AlertContext'
import Column from '@components/layout/Column'
import Card from '@components/layout/Card'
import Row from '@components/layout/Row'
import Icon from '@components/resources/Icon'
import { TeamCreationHumansImage } from '@resources/Images'
import SubTitle from '@components/text/SubTitle'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/contexts/ThemeContext'

const CreateNewTeamScreen = (): ReactNode => {
    const navigate = useNavigate()
    const { setUser } = useUser()
    const { showAlert } = useAlert()
    const { theme } = useTheme()

    const [newTeamName, setNewTeamName] = useState('')

    const handleCreateTeam = (): void => {
        if(!newTeamName) {
            showAlert('Team name cannot be empty.' , 'warning')
            return
        }

        createTeamAction({
            name: newTeamName
        }).then((res) => {
            setUser(prev => {
                if (!prev) return prev

                return {
                    ...prev,
                    memberships: [
                        ...prev.memberships,
                        {
                            id: res.id,
                            team: res,
                            role: 'admin'
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
        <Column>
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
                                Create your team
                            </SubTitle>
                            <Text
                                color={theme.primary}
                            >
                                Teams are the heart of collaboration in Flow
                            </Text>
                            <Text>
                                Give your team a name to get started and begin organizing your projects, tasks, and members in one place.
                            </Text>
                        </Column>
                        <TextField
                            inputValue={newTeamName}
                            setInputValue={setNewTeamName}
                            placeholder={'Your team name'}
                        />
                        <Button
                            onClick={handleCreateTeam}
                            label={'Create new team'}
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
                        <TeamCreationHumansImage/>
                    </Icon>
                </Row>
            </Card>
        </Column>
    )
}

export default CreateNewTeamScreen
