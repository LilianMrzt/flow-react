import React, { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/buttons/Button'
import TextField from '@components/inputs/TextField'
import { loginUserAction } from '@api/AuthApiCalls'
import { StorageConstants } from '@constants/StorageConstants'
import { useAlert } from '@hooks/contexts/AlertContext'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import Card from '@components/layout/Card'
import SubTitle from '@components/text/SubTitle'
import { LoginIcon } from '@resources/Icons'
import Row from '@components/layout/Row'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { AppRoutes } from '@constants/routes/AppRoutes'
import { useUser } from '@hooks/contexts/api/UserContext'
import Column from '@components/layout/Column'
import Icon from '@components/resources/Icon'
import { LoginImage } from '@resources/Images'
import BackgroundPlaceholderScreen from '@components/layout/background-placeholder-screen/BackgroundPlaceholderScreen'

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
            setUser(response.user)
        }).catch((error) => {
            showAlert(error.message , 'error')
        })
    }

    return (
        <BackgroundPlaceholderScreen>
            <Card
                maxWidth={800}
                padding={24}
                width={'100%'}
            >
                <Row>
                    <Column>
                        <Column
                            height={'fit-content'}
                            gap={16}
                            alignItems={'start'}
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
                        </Column>
                        <Column
                            gap={0}
                            height={'fit-content'}
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
                                    label={'Reset password'}
                                    backgroundColor={theme.surface}
                                    color={theme.primary}
                                    hoverBackgroundColor={theme.secondary}
                                    borderColor={theme.surface}
                                />
                            </Row>
                        </Column>
                    </Column>
                    <Icon
                        size={400}
                    >
                        <LoginImage/>
                    </Icon>
                </Row>
            </Card>
        </BackgroundPlaceholderScreen>
    )
}

export default LoginScreen
