import React, { createContext, useContext, useState, type FC, useEffect } from 'react'
import { LoadedProjectContextProps } from '@interfaces/hooks/contexts/api/LoadedProjectContextProps'
import { LoadedProjectProviderProps } from '@interfaces/hooks/contexts/api/LoadedProjectProviderProps'
import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'
import { getProjectBySlugAction } from '@api/ProjectsApiCalls'
import { useParams } from 'react-router'
import { useAlert } from '@hooks/contexts/AlertContext'

const LoadedProjectContext = createContext<LoadedProjectContextProps | undefined>(undefined)

export const LoadedProjectProvider: FC<LoadedProjectProviderProps> = ({
    children
}) => {
    const {
        showAlert
    } = useAlert()

    const [loadedProject, setLoadedProject] = useState<ProjectObject | null>(null)

    const {
        slug
    } = useParams<{ slug: string }>()

    /**
     * Récupération du projet actuel via son slug
     */
    useEffect(() => {
        const fetchProject = async (): Promise<void> => {
            if (!slug) return

            await getProjectBySlugAction(slug)
                .then((res) => {
                    setLoadedProject(res)
                })
                .catch((error) => {
                    showAlert(error.message , 'error')
                })
        }

        void fetchProject()
    }, [slug])

    return (
        <LoadedProjectContext.Provider
            value={{
                loadedProject,
                slug
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
