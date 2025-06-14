import React, { ReactNode, useEffect, useState } from 'react'
import Card from '@components/layout/Card'
import SubTitle from '@components/text/SubTitle'
import TextField from '@components/inputs/TextField'
import { useNavigate , useSearchParams } from 'react-router-dom'
import Button from '@components/buttons/Button'
import { useAlert } from '@hooks/contexts/AlertContext'
import { resetPasswordAction, verifyResetTokenAction } from '@api/AuthApiCalls'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import Row from '@components/layout/Row'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Column from '@components/layout/Column'
import Icon from '@components/resources/Icon'
import { ResetPasswordImage } from '@resources/Images'
import BackgroundPlaceholderScreen from '@components/layout/background-placeholder-screen/BackgroundPlaceholderScreen'

const ResetPasswordScreen = (): ReactNode => {
    const navigate = useNavigate()
    const { showAlert } = useAlert()
    const { theme } = useTheme()

    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    /**
     * Gère la réinitialisation du mot de passe
     */
    const handleSubmit = (): void => {
        if(!newPassword || !confirmNewPassword) {
            showAlert('Missing mandatory fields.' , 'warning')
            return
        }

        if(newPassword !== confirmNewPassword) {
            showAlert('Passwords do not match.' , 'warning')
            return
        }

        if (!token) {
            return
        }

        resetPasswordAction({
            token,
            newPassword,
            confirmPassword: confirmNewPassword
        })
            .then((res) => {
                showAlert(res, 'success')
                navigate(AuthRoutes.signIn.path)
            })
            .catch((error) => {
                showAlert(error.message, 'error')
            })
    }

    /**
     * Si le token de réinitialisation du mot de passe n'est pas valide, redirige vers la page de connexion
     */
    useEffect(() => {
        if (!token) {
            navigate(AuthRoutes.signIn.path)
            return
        }

        verifyResetTokenAction(token)
            .then((isValid) => {
                if (!isValid) {
                    showAlert('Reset token is invalid or expired.', 'error')
                    navigate(AuthRoutes.signIn.path)
                }
            })
            .catch(() => {
                showAlert('Failed to verify reset token.', 'error')
                navigate(AuthRoutes.signIn.path)
            })
    }, [token])

    return (
        <BackgroundPlaceholderScreen>
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
                            Reset your password
                        </SubTitle>
                        <TextField
                            inputValue={newPassword}
                            setInputValue={setNewPassword}
                            label={'New password'}
                            placeholder={'•••••••'}
                            name={'new-user-password'}
                            type={'password'}
                        />
                        <TextField
                            inputValue={confirmNewPassword}
                            setInputValue={setConfirmNewPassword}
                            label={'Confirm new password'}
                            placeholder={'•••••••'}
                            name={'confirm-new-user-password'}
                            type={'password'}
                        />
                        <Button
                            onClick={handleSubmit}
                            label={'Reset password'}
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
                        <ResetPasswordImage/>
                    </Icon>
                </Row>
            </Card>
        </BackgroundPlaceholderScreen>
    )
}

export default ResetPasswordScreen
