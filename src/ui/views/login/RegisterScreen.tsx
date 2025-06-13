import React, { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/buttons/Button'
import TextField from '@components/inputs/TextField'
import { registerUserAction } from '@api/AuthApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import './login-screen.css'
import Card from '@components/layout/Card'
import Text from '@components/text/Text'
import Row from '@components/layout/Row'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { CreateUserIcon } from '@resources/Icons'
import SubTitle from '@components/text/SubTitle'

const RegisterScreen = (): ReactNode => {
    const navigate = useNavigate()

    const {
        showAlert
    } = useAlert()

    const {
        theme
    } = useTheme()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    /**
     * Gestion du submit lors du register
     */
    const handleSubmit = async (): Promise<void> => {
        if (!email || !password || !firstName || !lastName) {
            showAlert('Missing fields.' , 'warning')
            return
        }

        if (password !== confirmPassword) {
            showAlert('Passwords are not the same.' , 'warning')
            return
        }

        await registerUserAction({
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            lastName: lastName,
            firstName: firstName
        }).then(() => {
            showAlert('Account created successfully.' , 'success')
            navigate(AuthRoutes.signIn.path)
        }).catch((error) => {
            showAlert(error.message , 'error')
        })
    }

    return (
        <div
            className={'register-screen'}
        >
            <Card>
                <SubTitle>
                    Create an account
                </SubTitle>
                <Row
                    gap={16}
                >
                    <TextField
                        inputValue={firstName}
                        setInputValue={setFirstName}
                        label={'First name'}
                        placeholder={'John'}
                    />
                    <TextField
                        inputValue={lastName}
                        setInputValue={setLastName}
                        label={'Last name'}
                        placeholder={'Doe'}
                    />
                </Row>
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
                <TextField
                    inputValue={confirmPassword}
                    setInputValue={setConfirmPassword}
                    label={'Confirm password'}
                    placeholder={'•••••••'}
                    type={'password'}
                />
                <Button
                    onClick={() => {
                        void handleSubmit()
                    }}
                    label={'Create account'}
                    icon={<CreateUserIcon/>}
                    width={'100%'}
                />
                <Row>
                    <Text
                        color={theme.textSecondary}
                    >
                        Already have an account?
                    </Text>
                    <Button
                        onClick={() => {
                            navigate(AuthRoutes.signIn.path)
                        }}
                        label={'Log in'}
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

export default RegisterScreen
