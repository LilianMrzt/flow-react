import React, { FC, ReactNode } from 'react'
import TextField from '@components/inputs/TextField'
import Button from '@components/buttons/Button'
import Text from '@components/text/Text'
import { GoogleLogin } from '@react-oauth/google'
import { checkIfEmailExists, registerWithGoogleAction } from '@api/AuthApiCalls'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import { isValidEmail } from '@utils/AuthUtils'
import { useNavigate } from 'react-router-dom'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useTheme } from '@hooks/contexts/ThemeContext'
import {
    AccountCreationLandingSectionProps
} from '@interfaces/ui/blocs/views/auth/register-screen/AccountCreationLandingSectionProps'

const AccountCreationLandingSection: FC<AccountCreationLandingSectionProps> = ({
    email,
    setEmail,
    setIsManualAccountCreationInformationsVisible
}): ReactNode => {
    const navigate = useNavigate()
    const { showAlert } = useAlert()
    const { theme } = useTheme()

    /**
   * Gestion du register via Google
   */
    const handleGoogleRegister = async (idToken: string): Promise<void> => {
        await registerWithGoogleAction(idToken)
            .then(() => {
                showAlert('Account created successfully. Please check your email address to verify your account in order to log in.' , 'success')
                navigate(AuthRoutes.accountCreated.path)
            })
            .catch((error) => {
                showAlert(error.message, 'error')
            })
    }

    /**
   * Vérification de l'email pour la creation de compte
   */
    const handleCheckEmailExist = (): void => {
        if (!isValidEmail(email)) {
            showAlert('Invalid email format.', 'warning')
            return
        }

        checkIfEmailExists(
            email
        ).then((res) => {
            if(res) {
                showAlert('This email is already used.', 'error')
            } else {
                setIsManualAccountCreationInformationsVisible(true)
            }
        }).catch((error) => {
            showAlert(error.message, 'error')
        })
    }

    return (
        <>
            <TextField
                inputValue={email}
                setInputValue={setEmail}
                label={'Email'}
                placeholder={'example@email.com'}
            />
            <Button
                onClick={handleCheckEmailExist}
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
                text={'signup_with'}
            />
        </>
    )
}

export default AccountCreationLandingSection
