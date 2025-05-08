import React, { createContext, useContext, useState, type FC } from 'react'
import { ProjectContextProps } from '@interfaces/hooks/contexts/api/ProjectContextProps'
import { ProjectProviderProps } from '@interfaces/hooks/contexts/api/ProjectProviderProps'
import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined)

export const ProjectProvider: FC<ProjectProviderProps> = ({
    children
}) => {
    const [projects, setProjects] = useState<ProjectObject[]>([])
    const [hasFetchedOnceDashboardScreen, setHasFetchedOnceDashboardScreen] = useState(false)
    const [hasFetchedOnceProjectsScreen, setHasFetchedOnceProjectsScreen] = useState(false)
    /**
     * Gestion de l'état des projets lors de la création d'un nouveau projet
     * @param newProject
     */
    const createProjectStateUpdate = (
        newProject: ProjectObject
    ): void => {
        setProjects(prev => {
            return [...prev, newProject]
        })
    }

    /**
     * Gestion de l'état des projets lors de la récupération des projets
     * @param projects
     */
    const getProjectsStateUpdate = (
        projects: ProjectObject[]
    ): void => {
        setProjects(projects)
    }

    return (
        <ProjectContext.Provider
            value={{
                projects,
                createProjectStateUpdate,
                getProjectsStateUpdate,
                hasFetchedOnceDashboardScreen,
                setHasFetchedOnceDashboardScreen,
                hasFetchedOnceProjectsScreen,
                setHasFetchedOnceProjectsScreen
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}

export const useProject = (): ProjectContextProps => {
    const context = useContext(ProjectContext)
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider')
    }
    return context
}
