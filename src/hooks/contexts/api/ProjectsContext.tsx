import React, { createContext, useContext, useState, type FC, useEffect } from 'react'
import { ProjectsContextProps } from '@interfaces/hooks/contexts/api/ProjectsContextProps'
import { ProjectsProviderProps } from '@interfaces/hooks/contexts/api/ProjectsProviderProps'
import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'
import { createProjectAction, getRecentUserProjectsAction, getUserProjectsPaginatedAction } from '@api/ProjectsApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useLocation } from 'react-router'

const ProjectsContext = createContext<ProjectsContextProps | undefined>(undefined)

export const ProjectsProvider: FC<ProjectsProviderProps> = ({
    children
}) => {
    const { showAlert } = useAlert()
    const location = useLocation()

    const [projects, setProjects] = useState<ProjectObject[]>([])
    const [recentProjects, setRecentProjects] = useState<ProjectObject[]>([])
    const [activeProjectKey, setActiveProjectKey] = useState<string | null>(null)

    const [hasFetchedOnceDashboardScreen, setHasFetchedOnceDashboardScreen] = useState(false)
    const [hasFetchedOnceProjectsScreen, setHasFetchedOnceProjectsScreen] = useState(false)

    /**
     * Récupération des projets de l'utilisateur via l'api
     * @param limit
     * @param offset
     */
    const fetchUserProjects = async (limit = 10, offset = 0): Promise<void> => {
        if (hasFetchedOnceProjectsScreen) return

        await getUserProjectsPaginatedAction(limit, offset)
            .then((res) => {
                setProjects(res)
            }).catch((error) => {
                showAlert(error.message , 'error')
            }).finally(() => {
                setTimeout(() => {
                    setHasFetchedOnceProjectsScreen(true)
                }, 800) // TODO: retirer le delay
            })
    }

    /**
     * Récupération des projets récents de l'utilisateur via l'api
     */
    const fetchRecentUserProjects = async (): Promise<void> => {
        if (hasFetchedOnceDashboardScreen) return

        await getRecentUserProjectsAction()
            .then((res) => {
                setRecentProjects(res)
            }).catch((error) => {
                showAlert(error.message , 'error')
            }).finally(() => {
                setTimeout(() => {
                    setHasFetchedOnceDashboardScreen(true)
                }, 800) // TODO: retirer le delay
            })
    }

    /**
     * Création d'un projet via l'api
     * @param projectData
     * @param handleModalClose
     */
    const createProject = async (projectData: {
        name: string
        key: string
        description?: string
    }, handleModalClose: () => void): Promise<void> => {
        await createProjectAction(projectData).then((res) => {
            showAlert('Project successfully created.' , 'success')
            setProjects(prev => {
                return [...prev, res]
            })
            setRecentProjects(prev => {
                const updated = [res, ...prev.filter(p => {
                    return p.id !== res.id
                })]
                updated.sort((a, b) => {
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                })
                return updated.slice(0, 4)
            })
            handleModalClose()
        }).catch((error) => {
            showAlert(error.message , 'error')
        })
    }

    /**
     * Récupération de la key des projets en fonction de la localisation
     */
    useEffect(() => {
        const match = location.pathname.match(/^\/projects\/([^/]+)/)
        if (match) {
            setActiveProjectKey(match[1])
        } else {
            setActiveProjectKey(null)
        }
    }, [location.pathname])

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                recentProjects,
                hasFetchedOnceDashboardScreen,
                hasFetchedOnceProjectsScreen,
                activeProjectKey,
                setActiveProjectKey,
                fetchUserProjects,
                fetchRecentUserProjects,
                createProject
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
