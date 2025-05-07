import React from 'react'
import { RouteType } from '@interfaces/types/RouteType'
import { DashboardIcon, GroupIcon, SettingsIcon } from '@resources/Icons'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'

export const DrawerRoutes: Record<string, RouteType> = {
    dashboard: {
        path: '/dashboard',
        label: 'Dashboard',
        icon: <DashboardIcon/>
    },
    projects: ProjectsRoutes.projects,
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
