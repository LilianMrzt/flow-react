import React, { createContext, useContext, useState, type FC } from 'react'
import { getTasksByProjectKeyAction } from '@api/TasksApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { TasksProviderProps } from '@interfaces/hooks/contexts/api/TasksProviderProps'
import { TasksContextProps } from '@interfaces/hooks/contexts/api/TasksContextProps'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { useTaskWebSocket } from '@hooks/hooks/useTaskWebSocket'
import { TaskLightObject } from '@interfaces/objects/api/task/TaskLightObject'

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

    const [tasks, setTasks] = useState<TaskLightObject[]>([])

    /**
     * Récupération des tâches du projet
     */
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

    useTaskWebSocket({
        tasks,
        setTasks
    })

    return (
        <TasksContext.Provider
            value={{
                tasks,
                fetchTasks
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
