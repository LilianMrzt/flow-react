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
        columnId?: string
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
