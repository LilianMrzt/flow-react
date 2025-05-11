import React, { ReactNode } from 'react'
import Column from '@components/layout/Column'
import SubTitle from '@components/text/SubTitle'
import Text from '@components/text/Text'
import Button from '@components/buttons/Button'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '@constants/routes/AppRoutes'

const Error404PageNotFoundScreen = (): ReactNode => {
    const navigate = useNavigate()

    return (
        <Column
            gap={24}
        >
            <SubTitle>
                Error 404: Page not found
            </SubTitle>
            <Text>
                You have tried to access a page that does not exist.
            </Text>
            <Button
                label={'Go to app dashboard'}
                onClick={() => {
                    navigate(AppRoutes.dashboard.path)
                }}
            />
        </Column>
    )
}

export default Error404PageNotFoundScreen
