import { RouteType } from '@interfaces/types/RouteType'
import { DashboardIcon, GroupIcon } from '@resources/Icons'
import React from 'react'

export const AppRoutes: Record<string, RouteType> = {
    profile: {
        label: 'Profile',
        path: '/profile'
    },
    settings: {
        path: '/settings',
        label: 'Settings'
    },
    dashboard: {
        path: '/dashboard',
        label: 'Dashboard',
        icon: <DashboardIcon/>
    },
    teams: {
        path: '/teams',
        label: 'Teams',
        icon: <GroupIcon/>
    },
    noTeamFound: {
        path: '/no-team-found',
        label: 'No team found'
    },
    createNewTeam: {
        path: '/create-team',
        label: 'Create team'
    },
    joinExistingTeam: {
        path: '/join-team',
        label: 'Join team'
    }
}
