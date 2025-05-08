import React, { createContext, useContext, useState, type FC, useEffect } from 'react'
import { LoadedProjectContextProps } from '@interfaces/hooks/contexts/api/LoadedProjectContextProps'
import { LoadedProjectProviderProps } from '@interfaces/hooks/contexts/api/LoadedProjectProviderProps'
import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'
import { getProjectBySlugAction } from '@api/ProjectsApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'
import { useWebSocket } from '@hooks/contexts/api/WebSocketContext'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { WebSocketEvents } from '@constants/WebSocketEvents'

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

    const socket = useWebSocket()

    const [loadedProject, setLoadedProject] = useState<ProjectObject | null>(null)
    const [tasks, setTasks] = useState<TaskObject[]>([])

    /**
     * Récupération du projet actuel via son slug
     */
    useEffect(() => {
        const fetchProject = async (): Promise<void> => {
            if (!activeProjectSlug) return

            await getProjectBySlugAction(activeProjectSlug)
                .then((res) => {
                    setLoadedProject(res)
                    setTasks(res.tasks || [])
                })
                .catch((error) => {
                    showAlert(error.message , 'error')
                })
        }

        void fetchProject()
    }, [activeProjectSlug])

    /**
     * Établit une connexion WebSocket à la room du projet actif pour écouter les événements de création de tâches en temps réel.
     * Lorsqu'une tâche est créée par un autre utilisateur, elle est ajoutée au state local.
     * Nettoie proprement la connexion à la room lors du démontage ou changement de projet.
     */
    useEffect(() => {
        if (!socket || !loadedProject) return

        socket.emit(WebSocketEvents.JOIN_PROJECT_ROOM, loadedProject.id)

        socket.on(WebSocketEvents.TASK_CREATED, (newTask: TaskObject) => {
            setTasks(prev => {
                return [...prev, newTask]
            })
        })

        return (): void => {
            socket.emit(WebSocketEvents.LEAVE_PROJECT_ROOM, activeProjectSlug)
            socket.off(WebSocketEvents.TASK_CREATED)
        }
    }, [socket, loadedProject])

    return (
        <LoadedProjectContext.Provider
            value={{
                loadedProject,
                tasks
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
