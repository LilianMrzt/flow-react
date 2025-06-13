import { StorageConstants } from '@constants/StorageConstants'
import { TeamObject } from '@interfaces/objects/api/team/TeamObject'

/**
 * Crée une nouvelle équipe
 * @param teamData
 */
export const createTeamAction = async (
    teamData: { name: string }
): Promise<TeamObject> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/teams`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(teamData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data.team
}

/**
 * Rejoint une équipe existante via un code
 * @param joinCode
 */
export const joinTeamAction = async (
    joinCode: string
): Promise<TeamObject> => {
    const token = localStorage.getItem(StorageConstants.token)

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/teams/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ joinCode })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data.team
}
