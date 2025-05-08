import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'
import { Dispatch, SetStateAction } from 'react'

export interface ProjectContextProps {
    projects: ProjectObject[]
    createProjectStateUpdate: (newProject: ProjectObject) => void
    getProjectsStateUpdate: (projects: ProjectObject[]) => void
    hasFetchedOnceDashboardScreen: boolean
    setHasFetchedOnceDashboardScreen: Dispatch<SetStateAction<boolean>>
    hasFetchedOnceProjectsScreen: boolean
    setHasFetchedOnceProjectsScreen: Dispatch<SetStateAction<boolean>>
}
