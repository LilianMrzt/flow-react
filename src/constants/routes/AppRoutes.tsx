import { RouteType } from '@interfaces/types/RouteType'
import { SettingsIcon } from '@resources/Icons'
import React from 'react'

export const AppRoutes: Record<string, RouteType> = {
    profile: {
        label: 'Profile',
        path: '/profile'
    },
    settings: {
        path: '/settings',
        label: 'Settings',
        icon: <SettingsIcon/>
    }
}
