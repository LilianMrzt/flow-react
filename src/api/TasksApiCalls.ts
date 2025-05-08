import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { StorageConstants } from '@constants/StorageConstants'

/**
 * Crée une nouvelle tâche dans un projet
 * @param projectSlug
 * @param taskData
 */
export const createTaskAction = async (
    projectSlug: string,
    taskData: { title: string; description: string; columnId?: string }
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
