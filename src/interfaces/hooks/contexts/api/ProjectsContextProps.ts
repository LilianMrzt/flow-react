import { Dispatch, SetStateAction } from 'react'
import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'

export interface ProjectsContextProps {
    projects: ProjectObject[]
    recentProjects: ProjectObject[]
    activeProjectKey: string | null
    setActiveProjectKey: Dispatch<SetStateAction<string | null>>
    fetchUserProjects: (limit?: number, offset?: number) => Promise<void>
    hasFetchedOnceProjectsScreen: boolean
    fetchRecentUserProjects: () => Promise<void>
    hasFetchedOnceDashboardScreen: boolean
    createProject: (projectData: { name: string, key: string, description?: string }, handleModalClose: () => void) => Promise<void>
}
