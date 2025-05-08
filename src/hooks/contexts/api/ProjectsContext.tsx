import React, { createContext, useContext, useState, type FC, useEffect } from 'react'
import { ProjectsContextProps } from '@interfaces/hooks/contexts/api/ProjectsContextProps'
import { ProjectsProviderProps } from '@interfaces/hooks/contexts/api/ProjectsProviderProps'
import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'

const ProjectsContext = createContext<ProjectsContextProps | undefined>(undefined)

export const ProjectsProvider: FC<ProjectsProviderProps> = ({
    children
}) => {
    const [projects, setProjects] = useState<ProjectObject[]>([])
    const [recentProjects, setRecentProjects] = useState<ProjectObject[]>([])
    const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null)

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
     * @param projectsParam
     */
    const getProjectsStateUpdate = (
        projectsParam: ProjectObject[]
    ): void => {
        setProjects(projectsParam)
    }

    /**
     * Gestion de l'état des projets lors de la récupération des projets récents
     * @param recentProjectsParam
     */
    const getRecentProjectsStateUpdate = (
        recentProjectsParam: ProjectObject[]
    ): void => {
        setRecentProjects(recentProjectsParam)
    }

    /**
     * Récupération du slug des projets en fonction de la localisation
     */
    useEffect(() => {
        const match = location.pathname.match(/^\/projects\/([^/]+)/)
        if (match) {
            setActiveProjectSlug(match[1])
        } else {
            setActiveProjectSlug(null)
        }
    }, [location.pathname])

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                recentProjects,
                createProjectStateUpdate,
                getProjectsStateUpdate,
                getRecentProjectsStateUpdate,
                hasFetchedOnceDashboardScreen,
                setHasFetchedOnceDashboardScreen,
                hasFetchedOnceProjectsScreen,
                setHasFetchedOnceProjectsScreen,
                activeProjectSlug,
                setActiveProjectSlug
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export const useProjects = (): ProjectsContextProps => {
    const context = useContext(ProjectsContext)
    if (!context) {
        throw new Error('useProjects must be used within a ProjectsProvider')
    }
    return context
}
