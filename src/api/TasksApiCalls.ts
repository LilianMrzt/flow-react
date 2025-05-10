import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { StorageConstants } from '@constants/StorageConstants'

/**
 * Crée une nouvelle tâche dans un projet
 * @param projectSlug
 * @param taskData
 */
export const createTaskAction = async (
    projectSlug: string,
    taskData: {
        title: string
        description: string
        type: string
        priority: string
        columnId?: string,
        assignedUser?: string,
    }
): Promise<TaskObject> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectSlug}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data.task
}

/**
 * Supprime une tâche d’un projet
 * @param projectSlug
 * @param taskId
 */
export const deleteTaskAction = async (
    projectSlug: string,
    taskId: string
): Promise<void> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectSlug}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
    }
}

/**
 * Récupère toutes les tâches d’un projet
 * @param projectSlug
 */
export const getTasksByProjectSlugAction = async (
    projectSlug: string
): Promise<TaskObject[]> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectSlug}/tasks`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}

/**
 * Met à jour une tâche d’un projet
 * @param projectSlug
 * @param taskId
 * @param data
 */
export const updateTaskAction = async (
    projectSlug: string,
    taskId: string,
    data: {
        columnId?: string | null
        title?: string
        description?: string
        priority?: string
        type?: string
    }
): Promise<TaskObject> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectSlug}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const resData = await response.json()
    if (!response.ok) {
        throw new Error(resData.message)
    }

    return resData.task
}

/**
 * Gestion de la mise à jour de l'ordre des taches dans le backlog
 * @param projectSlug
 * @param updates
 */
export const updateBacklogTasksOrdersAction = async (
    projectSlug: string,
    updates: { id: string, orderInBacklog: number }[]
): Promise<void> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectSlug}/tasks/reorder-backlog`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ updates })
    })

    if (!response.ok) {
        const resData = await response.json()
        throw new Error(resData.message)
    }
}
