import React, { createContext, useContext, useEffect, useState, type FC } from 'react'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { getTasksByProjectKeyAction } from '@api/TasksApiCalls'
import { useWebSocket } from '@hooks/contexts/api/WebSocketContext'
import { WebSocketEvents } from '@constants/WebSocketEvents'
import { useAlert } from '@hooks/contexts/AlertContext'
import { TasksProviderProps } from '@interfaces/hooks/contexts/api/TasksProviderProps'
import { TasksContextProps } from '@interfaces/hooks/contexts/api/TasksContextProps'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'

const TasksContext = createContext<TasksContextProps | undefined>(undefined)

export const TasksProvider: FC<TasksProviderProps> = ({
    children
}) => {
    const {
        loadedProject
    } = useLoadedProject()

    const {
        showAlert
    } = useAlert()
    const socket = useWebSocket()

    const [tasks, setTasks] = useState<TaskObject[]>([])

    /**
     * Récupération des tâches du projet
     */
    useEffect(() => {
        const fetchTasks = async (): Promise<void> => {
            if (!loadedProject) return

            await getTasksByProjectKeyAction(loadedProject.key)
                .then((data) => {
                    setTasks(data)
                })
                .catch((error) => {
                    showAlert(error.message, 'error')
                })
        }

        void fetchTasks()
    }, [loadedProject])

    /**
     * Établit une connexion WebSocket à la room du projet actif pour écouter les événements de création de tâches en temps réel.
     * Lorsqu'une tâche est créée par un autre utilisateur, elle est ajoutée au state local.
     * Nettoie proprement la connexion à la room lors du démontage ou changement de projet.
     */
    useEffect(() => {
        if (!socket || !loadedProject) return

        socket.emit(WebSocketEvents.JOIN_PROJECT_ROOM, loadedProject.id)

        const handleTaskCreated = (task: TaskObject): void => {
            setTasks(prev => {
                return [...prev, task]
            })
            console.log(task)
        }

        const handleTaskDeleted = (deletedTaskId: string): void => {
            setTasks(prev => {
                return prev.filter(task => {
                    return task.id !== deletedTaskId
                })
            })
        }

        const handleTaskUpdated = (updatedTask: TaskObject): void => {
            setTasks(prev => {
                return prev.map(t => {
                    return t.id === updatedTask.id ? updatedTask : t
                })
            })
        }

        const handleBacklogTasksReordered = (updatedTasks: TaskObject[]): void => {
            setTasks(prev => {
                const backlogIds = new Set(updatedTasks.map(t => {
                    return t.id
                }))
                const unchanged = prev.filter(t => {
                    return !backlogIds.has(t.id)
                })
                return [...unchanged, ...updatedTasks]
            })
        }

        const handleBoardTasksReordered = (updatedTasks: TaskObject[]): void => {
            setTasks(prev => {
                const updatedIds = new Set(updatedTasks.map(t => {
                    return t.id
                }))
                const others = prev.filter(t => {
                    return !updatedIds.has(t.id)
                })
                return [...others, ...updatedTasks]
            })
        }

        socket.on(WebSocketEvents.TASK_CREATED, handleTaskCreated)
        socket.on(WebSocketEvents.TASK_DELETED, handleTaskDeleted)
        socket.on(WebSocketEvents.TASK_UPDATED, handleTaskUpdated)
        socket.on(WebSocketEvents.BACKLOG_TASKS_REORDERED, handleBacklogTasksReordered)
        socket.on(WebSocketEvents.BOARD_TASKS_REORDERED, handleBoardTasksReordered)

        return (): void => {
            socket.emit(WebSocketEvents.LEAVE_PROJECT_ROOM, loadedProject.key)
            socket.off(WebSocketEvents.TASK_CREATED, handleTaskCreated)
            socket.off(WebSocketEvents.TASK_DELETED, handleTaskDeleted)
            socket.off(WebSocketEvents.TASK_UPDATED, handleTaskUpdated)
            socket.off(WebSocketEvents.BACKLOG_TASKS_REORDERED, handleBacklogTasksReordered)
            socket.off(WebSocketEvents.BOARD_TASKS_REORDERED, handleBoardTasksReordered)
        }
    }, [socket, loadedProject])

    return (
        <TasksContext.Provider
            value={{
                tasks
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = (): TasksContextProps => {
    const context = useContext(TasksContext)
    if (!context) {
        throw new Error('useTasks must be used within a TasksProvider')
    }
    return context
}
