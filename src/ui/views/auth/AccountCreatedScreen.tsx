import React, { ReactNode } from 'react'
import BackgroundPlaceholderScreen from '@components/layout/background-placeholder-screen/BackgroundPlaceholderScreen'
import Text from '@components/text/Text'
import Card from '@components/layout/Card'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import Button from '@components/buttons/Button'
import { useNavigate } from 'react-router-dom'

const AccountCreatedScreen = (): ReactNode => {
    const navigate = useNavigate()

    return (
        <BackgroundPlaceholderScreen>
            <Card
                maxWidth={400}
                padding={24}
                width={'100%'}
                alignItems={'start'}
            >
                <Text>
                    Account successfully created!
                </Text>
                <Text>
                    A verification link was sent to your email.
                </Text>
                <Text>
                    Please check your inbox to activate your account.
                </Text>
                <Button
                    label={'Go to login'}
                    onClick={() => {
                        return navigate(AuthRoutes.signIn.path)
                    }}
                    width={'100%'}
                />
            </Card>
        </BackgroundPlaceholderScreen>
    )
}

export default AccountCreatedScreen
