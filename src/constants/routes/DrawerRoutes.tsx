import React from 'react'
import { RouteType } from '@interfaces/types/RouteType'
import { DashboardIcon, ProjectsIcon } from '@resources/Icons'

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
    }
}
