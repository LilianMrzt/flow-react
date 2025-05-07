import React, { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/buttons/Button'
import { DrawerRoutes } from '@constants/routes/DrawerRoutes'
import TextField from '@components/inputs/TextField'
import { loginUser } from '@api/AuthApiCalls'
import { StorageConstants } from '@constants/StorageConstants'
import { useAlert } from '@hooks/contexts/AlertContext'

const LoginScreen = (): ReactNode => {
    const navigate = useNavigate()
    const {
        showAlert
    } = useAlert()

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

        await loginUser({
            email: email,
            password: password
        }).then((response) => {
            if (response.success) {
                sessionStorage.setItem(StorageConstants.token, response.token || '')
                navigate(DrawerRoutes.dashboard.path)
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
                label={'Register instead'}
            />
        </div>
    )
}

export default LoginScreen
