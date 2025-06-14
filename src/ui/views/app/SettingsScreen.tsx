import React, { ReactNode } from 'react'
import Screen from '@components/layout/screen/Screen'

const SettingsScreen = (): ReactNode => {
    return (
        <Screen
            label={'Settings'}
            description={'Customize your application experience'}
        >
            SettingsScreen
        </Screen>
    )
}

export default SettingsScreen
