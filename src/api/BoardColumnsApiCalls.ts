import { StorageConstants } from '@constants/StorageConstants'
import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'

/**
 * Récupère toutes les colonnes d’un projet
 * @param projectKey
 */
export const getColumnsByProjectKeyAction = async (
    projectKey: string
): Promise<BoardColumnObject[]> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectKey}/columns`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data.columns
}
