import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import { useAlert } from '@hooks/contexts/AlertContext'
import { verifyEmailAction } from '@api/AuthApiCalls'
import Text from '@components/text/Text'
import Column from '@components/layout/Column'

const VerifyEmailScreen = (): ReactNode => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { showAlert } = useAlert()

    const [loading, setLoading] = useState(true)

    const hasRunRef = useRef(false)

    useEffect(() => {
        if (hasRunRef.current) return
        hasRunRef.current = true

        const token = searchParams.get('token')

        if (!token) {
            showAlert('Invalid or missing verification token.', 'error')
            navigate(AuthRoutes.signIn.path)
            return
        }

        verifyEmailAction(token)
            .then(() => {
                showAlert('Your email has been verified. You can now sign in.', 'success')
            })
            .catch((err) => {
                console.log(err)
                showAlert('Failed to verify email. Please try again.', 'error')
            })
            .finally(() => {
                setLoading(false)
                setTimeout(() => {
                    navigate(AuthRoutes.signIn.path)
                }, 1000)
            })
    }, [])

    return (
        <Column>
            {loading ? (
                <Text>
                    Verifying your email...
                </Text>
            ) : (
                <Text>
                    Redirecting...
                </Text>
            )}
        </Column>
    )
}

export default VerifyEmailScreen
