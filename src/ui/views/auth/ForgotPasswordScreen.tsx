import React, { ReactNode, useState } from 'react'
import Card from '@components/layout/Card'
import { SendEmailIcon } from '@resources/Icons'
import SubTitle from '@components/text/SubTitle'
import TextField from '@components/inputs/TextField'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Button from '@components/buttons/Button'
import Text from '@components/text/Text'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import { useAlert } from '@hooks/contexts/AlertContext'
import { forgotPasswordAction } from '@api/AuthApiCalls'
import Row from '@components/layout/Row'
import Column from '@components/layout/Column'
import Icon from '@components/resources/Icon'
import { ForgotPasswordImage } from '@resources/Images'

const ForgotPasswordScreen = (): ReactNode => {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const { showAlert } = useAlert()

    const [email, setEmail] = useState('')

    /**
     * Gestion du submit de la demande de réinitialisation du mot de passe
     */
    const handleSubmit = (): void => {
        if(!email) {
            showAlert('Missing mandatory fields.' , 'warning')
            return
        }

        forgotPasswordAction({
            email
        })
            .then((res) => {
                showAlert(res, 'success')
            })
            .catch((error) => {
                showAlert(error.message, 'error')
            })
    }

    return (
        <Column>
            <Card
                maxWidth={800}
                padding={24}
                width={'100%'}
            >
                <Row>
                    <Column
                        alignItems={'start'}
                        gap={16}
                    >
                        <SubTitle>
                           Forgot your password?
                        </SubTitle>
                        <Text
                            color={theme.textSecondary}
                        >
                            Please enter your email address and we will send you a link to reset your password.
                        </Text>
                        <TextField
                            inputValue={email}
                            setInputValue={setEmail}
                            label={'Email'}
                            placeholder={'example@email.com'}
                            name={'user-email'}
                        />
                        <Button
                            onClick={handleSubmit}
                            label={'Request reset link'}
                            icon={<SendEmailIcon/>}
                            width={'100%'}
                            fontWeight={500}
                        />
                        <Row>
                            <Text
                                fontSize={14}
                            >
                               Want to sign in?
                            </Text>
                            <Button
                                fontSize={14}
                                onClick={() => {
                                    navigate(AuthRoutes.signIn.path)
                                }}
                                label={'Sign in'}
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
                        <ForgotPasswordImage/>
                    </Icon>
                </Row>
            </Card>
        </Column>
    )
}

export default ForgotPasswordScreen
