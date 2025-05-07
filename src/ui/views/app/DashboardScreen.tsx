import React, { ReactNode } from 'react'
import Screen from '@components/layout/Screen'
import { useUser } from '@hooks/contexts/api/UserContext'

const DashboardScreen = (): ReactNode => {
    const {
        user
    } = useUser()

    return (
        <Screen
            label={'Dashboard'}
            description={'Your projects and task overview'}
        >
            Welcome, {user?.firstName} {user?.lastName}
        </Screen>
    )
}

export default DashboardScreen
