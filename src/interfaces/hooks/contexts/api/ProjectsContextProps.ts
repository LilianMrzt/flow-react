import { Dispatch, SetStateAction } from 'react'
import { ProjectSummaryObject } from '@interfaces/objects/api/project/ProjectSummaryObject'

export interface ProjectsContextProps {
    projects: ProjectSummaryObject[]
    recentProjects: ProjectSummaryObject[]
    activeProjectKey: string | null
    setActiveProjectKey: Dispatch<SetStateAction<string | null>>
    fetchUserProjects: (limit?: number, offset?: number) => Promise<void>
    hasFetchedOnceProjectsScreen: boolean
    fetchRecentUserProjects: () => Promise<void>
    hasFetchedOnceDashboardScreen: boolean
    createProject: (projectData: { name: string, key: string, description?: string }, handleModalClose: () => void) => Promise<void>
}
