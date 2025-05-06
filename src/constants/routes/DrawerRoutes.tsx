import React from 'react'
import { RouteType } from '@interfaces/types/RouteType'
import { DashboardIcon, GroupIcon, ProjectsIcon, SettingsIcon } from '@resources/Icons'

export const DrawerRoutes: Record<string, RouteType> = {
    dashboard: {
        path: '/dashboard',
        label: 'Dashboard',
        icon: <DashboardIcon/>
    },
    projects: {
        path: '/projects',
        label: 'Projects',
        icon: <ProjectsIcon/>
    },
    teams: {
        path: '/teams',
        label: 'Teams',
        icon: <GroupIcon/>
    },
    settings: {
        path: '/settings',
        label: 'Settings',
        icon: <SettingsIcon/>
    }
}
