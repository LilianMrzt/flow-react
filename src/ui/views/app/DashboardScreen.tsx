import React, { ReactNode } from 'react'
import Screen from '@components/layout/Screen'

const DashboardScreen = (): ReactNode => {
    return (
        <Screen
            label={'Dashboard'}
            description={'Your projects and task overview'}
        >
            Dashboard
        </Screen>
    )
}

export default DashboardScreen
