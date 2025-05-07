import { RouteType } from '@interfaces/types/RouteType'
import { ProjectsIcon } from '@resources/Icons'
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
    }
}
