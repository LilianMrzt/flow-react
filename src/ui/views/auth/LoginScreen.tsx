import React, { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/buttons/Button'
import TextField from '@components/inputs/TextField'
import { loginUserAction } from '@api/AuthApiCalls'
import { StorageConstants } from '@constants/StorageConstants'
import { useAlert } from '@hooks/contexts/AlertContext'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import './auth-screens.css'
import Card from '@components/layout/Card'
import SubTitle from '@components/text/SubTitle'
import { LoginIcon } from '@resources/Icons'
import Row from '@components/layout/Row'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { AppRoutes } from '@constants/routes/AppRoutes'
import { useUser } from '@hooks/contexts/api/UserContext'
import Column from '@components/layout/Column'

const LoginScreen = (): ReactNode => {
    const { showAlert } = useAlert()
    const { theme } = useTheme()
    const { setUser } = useUser()

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    /**
     * Gestion du submit lors du login
     */
    const handleSubmit = async (): Promise<void> => {
        if (!email || !password) {
            showAlert('Missing email or password.' , 'warning')
            return
        }

        await loginUserAction({
            email: email,
            password: password
        }).then((response) => {
            localStorage.setItem(StorageConstants.token, response.token || '')
            navigate(AppRoutes.dashboard.path)
            showAlert(response.message , 'success')
            setUser(response.user)
        }).catch((error) => {
            showAlert(error.message , 'error')
        })
    }

    return (
        <div
            className={'login-screen'}
        >
            <Card
                maxWidth={400}
                padding={24}
            >
                <SubTitle>
                    Welcome to Flow
                </SubTitle>
                <TextField
                    inputValue={email}
                    setInputValue={setEmail}
                    label={'Email'}
                    placeholder={'example@email.com'}
                    name={'user-email'}
                />
                <TextField
                    inputValue={password}
                    setInputValue={setPassword}
                    label={'Password'}
                    placeholder={'•••••••'}
                    type={'password'}
                    name={'user-password'}
                />
                <Button
                    onClick={() => {
                        void handleSubmit()
                    }}
                    label={'Login'}
                    icon={<LoginIcon/>}
                    width={'100%'}
                />
                <Column
                    gap={0}
                >
                    <Row>
                        <Text
                            fontSize={14}
                            color={theme.textSecondary}
                        >
                            {'Don\'t have an account?'}
                        </Text>
                        <Button
                            fontSize={14}
                            onClick={() => {
                                navigate(AuthRoutes.register.path)
                            }}
                            label={'Register'}
                            backgroundColor={theme.surface}
                            color={theme.primary}
                            hoverBackgroundColor={theme.secondary}
                            borderColor={theme.surface}
                        />
                    </Row>
                    <Row>
                        <Text
                            fontSize={14}
                            color={theme.textSecondary}
                        >
                            Forgot your password?
                        </Text>
                        <Button
                            fontSize={14}
                            onClick={() => {
                                navigate(AuthRoutes.forgotPassword.path)
                            }}
                            label={'Recover password'}
                            backgroundColor={theme.surface}
                            color={theme.primary}
                            hoverBackgroundColor={theme.secondary}
                            borderColor={theme.surface}
                        />
                    </Row>
                </Column>
            </Card>
        </div>
    )
}

export default LoginScreen
