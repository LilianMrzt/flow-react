import React, { ReactNode } from 'react'
import Button from '@components/buttons/Button'
import Text from '@components/text/Text'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '@constants/routes/AppRoutes'

const NoUserTeamFoundScreen = (): ReactNode => {
    const navigate = useNavigate()

    return (
        <div>
            <Button
                onClick={() => {
                    navigate(AppRoutes.createNewTeam.path)
                }}
                label={'Create new team'}
            />
            <Text>
                OR
            </Text>
            <Button
                onClick={() => {
                    navigate(AppRoutes.joinExistingTeam.path)
                }}
                label={'Join existing Team'}
            />
        </div>
    )
}

export default NoUserTeamFoundScreen
