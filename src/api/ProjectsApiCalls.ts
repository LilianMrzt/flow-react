import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'
import { StorageConstants } from '@constants/StorageConstants'

/**
 * Crée un nouveau projet
 * @param projectData
 */
export const createProjectAction = async (
    projectData: { name: string; description?: string }
): Promise<ProjectObject> => {
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
 * Récupère un projet par slug
 * @param slug
 */
export const getProjectBySlugAction = async (
    slug: string
): Promise<ProjectObject> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${slug}`, {
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
): Promise<ProjectObject[]> => {
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
export const getRecentUserProjectsAction = async (): Promise<ProjectObject[]> => {
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
