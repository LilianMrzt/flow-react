import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'
import { Dispatch, SetStateAction } from 'react'

export interface ProjectsContextProps {
    projects: ProjectObject[]
    recentProjects: ProjectObject[]
    createProjectStateUpdate: (newProject: ProjectObject) => void
    getProjectsStateUpdate: (projectsParam: ProjectObject[]) => void
    getRecentProjectsStateUpdate: (recentProjectsParam: ProjectObject[]) => void
    hasFetchedOnceDashboardScreen: boolean
    setHasFetchedOnceDashboardScreen: Dispatch<SetStateAction<boolean>>
    hasFetchedOnceProjectsScreen: boolean
    setHasFetchedOnceProjectsScreen: Dispatch<SetStateAction<boolean>>
    activeProjectKey: string | null
    setActiveProjectKey: Dispatch<SetStateAction<string | null>>
}
