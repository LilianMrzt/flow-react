import { UserObject } from '@interfaces/objects/api/user/UserObject'
import { UserLoginObject } from '@interfaces/objects/api/user/UserLoginObject'
import { UserRegisterObject } from '@interfaces/objects/api/user/UserRegisterObject'

/**
 * Fonction pour se connecter via l'interface
 * @param userData
 */
export const loginUserAction = async (
    userData: UserLoginObject
): Promise<{ token: string }> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return {
        token: data.token
    }
}

/**
 * Fonction pour s'enregistrer via l'interface
 * @param userData
 */
export const registerUserAction = async (
    userData: UserRegisterObject
): Promise<void> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }
}

/**
 * Récupère l'utilisateur via le token
 * @param token
 */
export const getUserFromTokenAction = async (
    token: string
): Promise<UserObject> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}
