import React, { createContext, useContext, useState, type FC, useEffect } from 'react'
import { LoadedProjectContextProps } from '@interfaces/hooks/contexts/api/LoadedProjectContextProps'
import { LoadedProjectProviderProps } from '@interfaces/hooks/contexts/api/LoadedProjectProviderProps'
import { getProjectByKeyAction } from '@api/ProjectsApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'
import { useNavigate } from 'react-router-dom'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { ProjectDetailsObject } from '@interfaces/objects/api/project/ProjectDetailsObject'

const LoadedProjectContext = createContext<LoadedProjectContextProps | undefined>(undefined)

export const LoadedProjectProvider: FC<LoadedProjectProviderProps> = ({
    children
}) => {
    const {
        activeProjectKey
    } = useProjects()

    const {
        showAlert
    } = useAlert()

    const navigate = useNavigate()

    const [loadedProject, setLoadedProject] = useState<ProjectDetailsObject | null>(null)

    /**
     * Récupération du projet actuel via sa key
     */
    const fetchProject = async (): Promise<void> => {
        if (!activeProjectKey) return

        await getProjectByKeyAction(activeProjectKey)
            .then((res) => {
                setLoadedProject(res)
            })
            .catch((error) => {
                showAlert(error.message , 'error')
                navigate(ProjectsRoutes.projectNotFound.path)
            })
    }

    useEffect(() => {
        void fetchProject()
    }, [activeProjectKey])

    return (
        <LoadedProjectContext.Provider
            value={{
                loadedProject,
                fetchProject
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
