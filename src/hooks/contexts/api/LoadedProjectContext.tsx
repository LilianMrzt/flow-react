import React, { createContext, useContext, useState, type FC, useEffect } from 'react'
import { LoadedProjectContextProps } from '@interfaces/hooks/contexts/api/LoadedProjectContextProps'
import { LoadedProjectProviderProps } from '@interfaces/hooks/contexts/api/LoadedProjectProviderProps'
import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'
import { getProjectByKeyAction } from '@api/ProjectsApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'
import { useNavigate } from 'react-router-dom'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'

const LoadedProjectContext = createContext<LoadedProjectContextProps | undefined>(undefined)

export const LoadedProjectProvider: FC<LoadedProjectProviderProps> = ({
    children
}) => {
    const {
        activeProjectSlug
    } = useProjects()

    const {
        showAlert
    } = useAlert()

    const navigate = useNavigate()

    const [loadedProject, setLoadedProject] = useState<ProjectObject | null>(null)

    /**
     * Récupération du projet actuel via son slug
     */
    useEffect(() => {
        const fetchProject = async (): Promise<void> => {
            if (!activeProjectSlug) return

            await getProjectByKeyAction(activeProjectSlug)
                .then((res) => {
                    setLoadedProject(res)
                })
                .catch((error) => {
                    showAlert(error.message , 'error')
                    navigate(ProjectsRoutes.projectNotFound.path)
                })
        }

        void fetchProject()
    }, [activeProjectSlug])

    return (
        <LoadedProjectContext.Provider
            value={{
                loadedProject
            }}
        >
            {children}
        </LoadedProjectContext.Provider>
    )
}

export const useLoadedProject = (): LoadedProjectContextProps => {
    const context = useContext(LoadedProjectContext)
    if (!context) {
        throw new Error('useLoadedProject must be used within a LoadedProjectProvider')
    }
    return context
}
