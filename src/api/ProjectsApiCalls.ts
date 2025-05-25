import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'
import { StorageConstants } from '@constants/StorageConstants'
import { ProjectSummaryObject } from '@interfaces/objects/api/project/ProjectSummaryObject'
import { ProjectDetailsObject } from '@interfaces/objects/api/project/ProjectDetailsObject'

/**
 * Crée un nouveau projet
 * @param projectData
 */
export const createProjectAction = async (
    projectData: { name: string; description?: string, key: string }
): Promise<ProjectSummaryObject> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data.project
}

/**
 * Récupère un projet par key
 * @param key
 */
export const getProjectByKeyAction = async (
    key: string
): Promise<ProjectDetailsObject> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${key}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data.project
}

/**
 * Récupère tous les projets de l'utilisateur connecté avec pagination
 */
export const getUserProjectsPaginatedAction = async (
    limit = 10,
    offset = 0
): Promise<ProjectSummaryObject[]> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects?limit=${limit}&offset=${offset}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data.projects
}

/**
 * Récupère les 4 projets les plus récents de l'utilisateur
 */
export const getRecentUserProjectsAction = async (): Promise<ProjectSummaryObject[]> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/recent`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data.projects
}

/**
 * Supprime un projet par son ID
 * @param projectId
 */
export const deleteProjectAction = async (
    projectId: string
): Promise<void> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }
}

/**
 * Met à jour un projet existant
 * @param projectId
 * @param updateData
 */
export const updateProjectAction = async (
    projectId: string,
    updateData: { name?: string, description?: string, key?: string }
): Promise<ProjectObject> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data.project
}
