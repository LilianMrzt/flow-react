import React, { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/buttons/Button'
import TextField from '@components/inputs/TextField'
import { loginUserAction } from '@api/AuthApiCalls'
import { StorageConstants } from '@constants/StorageConstants'
import { useAlert } from '@hooks/contexts/AlertContext'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import './login-screen.css'
import Card from '@components/layout/Card'
import SubTitle from '@components/text/SubTitle'
import { LoginIcon } from '@resources/Icons'
import Row from '@components/layout/Row'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { AppRoutes } from '@constants/routes/AppRoutes'

const LoginScreen = (): ReactNode => {
    const navigate = useNavigate()

    const {
        showAlert
    } = useAlert()

    const {
        theme
    } = useTheme()

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
        }).catch((error) => {
            showAlert(error.message , 'error')
        })
    }

    return (
        <div
            className={'login-screen'}
        >
            <Card>
                <SubTitle>
                    Welcome to Flow
                </SubTitle>
                <TextField
                    inputValue={email}
                    setInputValue={setEmail}
                    label={'Email'}
                    placeholder={'example@email.com'}
                />
                <TextField
                    inputValue={password}
                    setInputValue={setPassword}
                    label={'Password'}
                    placeholder={'•••••••'}
                    type={'password'}
                />
                <Button
                    onClick={() => {
                        void handleSubmit()
                    }}
                    label={'Login'}
                    icon={<LoginIcon/>}
                    width={'100%'}
                />
                <Row>
                    <Text
                        color={theme.textSecondary}
                    >
                        {'Don\'t have an account?'}
                    </Text>
                    <Button
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
            </Card>
        </div>
    )
}

export default LoginScreen
