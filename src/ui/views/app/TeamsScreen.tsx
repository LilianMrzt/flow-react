import React, { ReactNode } from 'react'
import Screen from '@components/layout/screen/Screen'

const TeamsScreen = (): ReactNode => {
    return (
        <Screen
            label={'Teams'}
            description={'Manage your teams and authorisations'}
        >
            SettingsScreen
        </Screen>
    )
}

export default TeamsScreen
