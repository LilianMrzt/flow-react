import React, { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/buttons/Button'
import TextField from '@components/inputs/TextField'
import { registerUser } from '@api/AuthApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { AuthRoutes } from '@constants/routes/AuthRoutes'

const RegisterScreen = (): ReactNode => {
    const navigate = useNavigate()
    const {
        showAlert
    } = useAlert()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

        await registerUser({
            email: email,
            password: password,
            lastName: lastName,
            firstName: firstName
        }).then((response) => {
            if (response.success) {
                navigate(AuthRoutes.signIn.path)
            }
        })
    }

    return (
        <div>
            <TextField
                inputValue={email}
                setInputValue={setEmail}
                label={'Email'}
                placeholder={''}
            />
            <TextField
                inputValue={firstName}
                setInputValue={setFirstName}
                label={'FirstName'}
                placeholder={''}
            />
            <TextField
                inputValue={lastName}
                setInputValue={setLastName}
                label={'LastName'}
                placeholder={''}
            />
            <TextField
                inputValue={password}
                setInputValue={setPassword}
                label={'Password'}
                placeholder={''}
            />
            <Button
                onClick={() => {
                    void handleSubmit()
                }}
                label={'Login'}
            />
            <Button
                onClick={() => {
                }}
                label={'Login instead'}
            />
        </div>
    )
}

export default RegisterScreen
