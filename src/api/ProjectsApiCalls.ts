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
 * Récupère un projet par slug (avec ses membres)
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
 * Récupère tous les projets de l'utilisateur connecté
 */
export const getUserProjectsAction = async (): Promise<ProjectObject[]> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects`, {
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
