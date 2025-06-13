import React, { ReactNode, useState } from 'react'
import TextField from '@components/inputs/TextField'
import Button from '@components/buttons/Button'
import { joinTeamAction } from '@api/TeamApiCalls'
import { AppRoutes } from '@constants/routes/AppRoutes'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useUser } from '@hooks/contexts/api/UserContext'
import { useNavigate } from 'react-router-dom'

const JoinExistingTeamScreen = (): ReactNode => {
    const [teamJoinCode, setTeamJoinCode] = useState('')
    const { showAlert } = useAlert()
    const { setUser } = useUser()
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
        <div>
            <TextField
                inputValue={teamJoinCode}
                setInputValue={setTeamJoinCode}
                placeholder={'*********'}
            />
            <Button
                onClick={handleJoinTeam}
                label={'Create new team'}
            />
        </div>
    )
}

export default JoinExistingTeamScreen
