import { RouteType } from '@interfaces/types/RouteType'
import {
    BacklogIcon, DangerZoneIcon, EvolutionIcon,
    FileTextIcon, GroupIcon,
    KanbanIcon,
    ProjectDashboardIcon,
    ProjectSettingsIcon,
    ProjectsIcon
} from '@resources/Icons'
import React from 'react'

export const ProjectsRoutes: Record<string, RouteType> = {
    projects: {
        path: '/projects',
        label: 'Projects',
        icon: <ProjectsIcon/>
    },
    projectDetails: {
        path: '/projects/:slug',
        label: 'Project',
        pathFn: ({ slug }) => {
            return `/projects/${slug}`
        }
    },
    projectDetailsBoard: {
        path: '/projects/:slug/board',
        label: 'Board',
        pathFn: ({ slug }) => {
            return `/projects/${slug}/board`
        },
        icon: <KanbanIcon/>
    },
    projectDetailsSettings: {
        path: '/projects/:slug/settings',
        label: 'Settings',
        pathFn: ({ slug }) => {
            return `/projects/${slug}/settings`
        },
        icon: <ProjectSettingsIcon/>
    },
    projectDetailsDashboard: {
        path: '/projects/:slug/dashboard',
        label: 'Dashboard',
        pathFn: ({ slug }) => {
            return `/projects/${slug}/dashboard`
        },
        icon: <ProjectDashboardIcon/>
    },
    projectDetailsBacklog: {
        path: '/projects/:slug/backlog',
        label: 'Backlog',
        pathFn: ({ slug }) => {
            return `/projects/${slug}/backlog`
        },
        icon: <BacklogIcon/>
    },
    projectNotFound: {
        path: '/projects/not-found',
        label: 'Error 404'
    },
    projectDetailsSettingsDetails: {
        path: '/projects/:slug/settings/details',
        label: 'Details',
        pathFn: ({ slug }) => {
            return `/projects/${slug}/settings/details`
        },
        icon: <FileTextIcon/>
    },
    projectDetailsSettingsAccess: {
        path: '/projects/:slug/settings/access',
        label: 'Access',
        pathFn: ({ slug }) => {
            return `/projects/${slug}/settings/access`
        },
        icon: <GroupIcon/>
    },
    projectDetailsSettingsBoard: {
        path: '/projects/:slug/settings/board',
        label: 'Board',
        pathFn: ({ slug }) => {
            return `/projects/${slug}/settings/board`
        },
        icon: <ProjectDashboardIcon/>
    },
    projectDetailsSettingsWorkflow: {
        path: '/projects/:slug/settings/workflow',
        label: 'Workflow',
        pathFn: ({ slug }) => {
            return `/projects/${slug}/settings/workflow`
        },
        icon: <EvolutionIcon/>
    },
    projectDetailsSettingsDangerZone: {
        path: '/projects/:slug/settings/danger-zone',
        label: 'Danger Zone',
        pathFn: ({ slug }) => {
            return `/projects/${slug}/settings/danger-zone`
        },
        icon: <DangerZoneIcon/>
    }
}
