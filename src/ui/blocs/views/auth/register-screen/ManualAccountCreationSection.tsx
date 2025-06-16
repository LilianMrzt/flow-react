import React, { FC, ReactNode, useState } from 'react'
import Row from '@components/layout/Row'
import IconButton from '@components/buttons/IconButton'
import { ArrowLeftIcon, CreateUserIcon } from '@resources/Icons'
import TextField from '@components/inputs/TextField'
import Button from '@components/buttons/Button'
import { isValidEmail } from '@utils/AuthUtils'
import { registerUserAction } from '@api/AuthApiCalls'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import {
    ManualAccountCreationSectionProps
} from '@interfaces/ui/blocs/views/auth/register-screen/ManualAccountCreationSectionProps'

const ManualAccountCreationSection: FC<ManualAccountCreationSectionProps> = ({
    email,
    setIsManualAccountCreationInformationsVisible
}): ReactNode => {
    const navigate = useNavigate()
    const { showAlert } = useAlert()
    const { theme } = useTheme()

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

        if (!isValidEmail(email)) {
            showAlert('Invalid email format.', 'warning')
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

    return (
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
                setInputValue={() => {}}
                label={'Email'}
                placeholder={'example@email.com'}
                disabled
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
    )
}

export default ManualAccountCreationSection
