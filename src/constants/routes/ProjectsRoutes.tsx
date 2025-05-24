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
        path: '/projects/:key',
        label: 'Project',
        pathFn: ({ key }) => {
            return `/projects/${key}`
        }
    },
    projectDetailsBoard: {
        path: '/projects/:key/board',
        label: 'Board',
        pathFn: ({ key }) => {
            return `/projects/${key}/board`
        },
        icon: <KanbanIcon/>
    },
    projectTaskModal: {
        path: '/projects/:key/board?task=:taskId',
        label: 'Task modal',
        pathFn: ({ key, taskId }) => {
            return `/projects/${key}/board?selectedTask=${taskId}`
        }
    },
    projectDetailsSettings: {
        path: '/projects/:key/settings',
        label: 'Settings',
        pathFn: ({ key }) => {
            return `/projects/${key}/settings`
        },
        icon: <ProjectSettingsIcon/>
    },
    projectDetailsDashboard: {
        path: '/projects/:key/dashboard',
        label: 'Dashboard',
        pathFn: ({ key }) => {
            return `/projects/${key}/dashboard`
        },
        icon: <ProjectDashboardIcon/>
    },
    projectDetailsBacklog: {
        path: '/projects/:key/backlog',
        label: 'Backlog',
        pathFn: ({ key }) => {
            return `/projects/${key}/backlog`
        },
        icon: <BacklogIcon/>
    },
    projectNotFound: {
        path: '/projects/not-found',
        label: 'Error 404'
    },
    projectDetailsSettingsDetails: {
        path: '/projects/:key/settings/details',
        label: 'Details',
        pathFn: ({ key }) => {
            return `/projects/${key}/settings/details`
        },
        icon: <FileTextIcon/>
    },
    projectDetailsSettingsAccess: {
        path: '/projects/:key/settings/access',
        label: 'Access',
        pathFn: ({ key }) => {
            return `/projects/${key}/settings/access`
        },
        icon: <GroupIcon/>
    },
    projectDetailsSettingsBoard: {
        path: '/projects/:key/settings/board',
        label: 'Board',
        pathFn: ({ key }) => {
            return `/projects/${key}/settings/board`
        },
        icon: <ProjectDashboardIcon/>
    },
    projectDetailsSettingsWorkflow: {
        path: '/projects/:key/settings/workflow',
        label: 'Workflow',
        pathFn: ({ key }) => {
            return `/projects/${key}/settings/workflow`
        },
        icon: <EvolutionIcon/>
    },
    projectDetailsSettingsDangerZone: {
        path: '/projects/:key/settings/danger-zone',
        label: 'Danger Zone',
        pathFn: ({ key }) => {
            return `/projects/${key}/settings/danger-zone`
        },
        icon: <DangerZoneIcon/>
    }
}
