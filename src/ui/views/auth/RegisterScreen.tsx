import React, { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/buttons/Button'
import TextField from '@components/inputs/TextField'
import { registerUserAction, registerWithGoogleAction } from '@api/AuthApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import Card from '@components/layout/Card'
import Text from '@components/text/Text'
import Row from '@components/layout/Row'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { ArrowLeftIcon, CreateUserIcon } from '@resources/Icons'
import SubTitle from '@components/text/SubTitle'
import Column from '@components/layout/Column'
import Icon from '@components/resources/Icon'
import { RegisterImage } from '@resources/Images'
import BackgroundPlaceholderScreen from '@components/layout/background-placeholder-screen/BackgroundPlaceholderScreen'
import { GoogleLogin } from '@react-oauth/google'
import IconButton from '@components/buttons/IconButton'

const RegisterScreen = (): ReactNode => {
    const navigate = useNavigate()
    const { showAlert } = useAlert()
    const { theme } = useTheme()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isManualAccountCreationInformationsVisible, setIsManualAccountCreationInformationsVisible] = useState(false)

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
            showAlert('Account created successfully. Please check your email address to verify your account in order to log in.' , 'success')
            navigate(AuthRoutes.signIn.path)
        }).catch((error) => {
            showAlert(error.message , 'error')
        })
    }

    /**
     * Gestion du register via Google
     */
    const handleGoogleRegister = async (idToken: string): Promise<void> => {
        await registerWithGoogleAction(idToken)
            .then(() => {
                showAlert('Account created successfully. Please check your email address to verify your account in order to log in.' , 'success')
                navigate(AuthRoutes.signIn.path)
            })
            .catch((error) => {
                showAlert(error.message, 'error')
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
                    <Column
                        alignItems={'start'}
                        gap={16}
                    >
                        <SubTitle>
                            Create an account
                        </SubTitle>
                        <Column
                            gap={16}
                            height={'fit-content'}
                        >
                            {isManualAccountCreationInformationsVisible && (
                                <>
                                    <Row
                                        justifyContent={'start'}
                                    >
                                        <IconButton
                                            onClick={() => {
                                                setIsManualAccountCreationInformationsVisible(false)
                                            }}
                                            backgroundColor={theme.surface}
                                            hoverColor={theme.primary}
                                            hoverBackgroundColor={theme.secondary}
                                        >
                                            <ArrowLeftIcon/>
                                        </IconButton>
                                    </Row>
                                    <TextField
                                        inputValue={email}
                                        setInputValue={setEmail}
                                        label={'Email'}
                                        placeholder={'example@email.com'}
                                    />
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
                                </>
                            )}
                            {!isManualAccountCreationInformationsVisible && (
                                <>
                                    <TextField
                                        inputValue={email}
                                        setInputValue={setEmail}
                                        label={'Email'}
                                        placeholder={'example@email.com'}
                                    />
                                    <Button
                                        onClick={() => {
                                            setIsManualAccountCreationInformationsVisible(true)
                                        }}
                                        label={'Continue'}
                                        width={'100%'}
                                        disabled={email === ''}
                                    />
                                    <Text
                                        color={theme.textSecondary}
                                        fontSize={14}
                                    >
                                        or create your account with
                                    </Text>
                                    <GoogleLogin
                                        onSuccess={async (credentialResponse) => {
                                            const idToken = credentialResponse.credential
                                            if (idToken) {
                                                await handleGoogleRegister(idToken)
                                            } else {
                                                showAlert('Invalid Google credential', 'error')
                                            }
                                        }}
                                        onError={() => {
                                            showAlert('Google login failed', 'error')
                                        }}
                                    />
                                </>
                            )}
                        </Column>
                        <Row>
                            <Text
                                fontSize={14}
                                color={theme.textSecondary}
                            >
                                Already have an account?
                            </Text>
                            <Button
                                fontSize={14}
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
                    </Column>
                    <Icon
                        size={400}
                    >
                        <RegisterImage/>
                    </Icon>
                </Row>
            </Card>
        </BackgroundPlaceholderScreen>
    )
}

export default RegisterScreen
