import React, { ReactNode, useState } from 'react'
import TextField from '@components/inputs/TextField'
import Button from '@components/buttons/Button'
import { AppRoutes } from '@constants/routes/AppRoutes'
import { useNavigate } from 'react-router-dom'
import { createTeamAction } from '@api/TeamApiCalls'
import { useUser } from '@hooks/contexts/api/UserContext'
import { useAlert } from '@hooks/contexts/AlertContext'

const CreateNewTeamScreen = (): ReactNode => {
    const navigate = useNavigate()
    const { setUser } = useUser()
    const { showAlert } = useAlert()

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
        <div>
            <TextField
                inputValue={newTeamName}
                setInputValue={setNewTeamName}
                placeholder={'Team'}
            />
            <Button
                onClick={handleCreateTeam}
                label={'Create new team'}
            />
        </div>
    )
}

export default CreateNewTeamScreen
