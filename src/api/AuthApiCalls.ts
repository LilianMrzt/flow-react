import { UserObject } from '@interfaces/objects/api/user/UserObject'
import { UserLoginObject } from '@interfaces/objects/api/user/UserLoginObject'
import { UserRegisterObject } from '@interfaces/objects/api/user/UserRegisterObject'
import { UserLoginResponseObject } from '@interfaces/objects/api/user/UserLoginResponseObject'
import { ResetPasswordObject } from '@interfaces/objects/api/user/ResetPasswordObject'
import { ForgotPasswordObject } from '@interfaces/objects/api/user/ForgotPasswordObject'

/**
 * Fonction pour se connecter via l'interface
 * @param userData
 */
export const loginUserAction = async (
    userData: UserLoginObject
): Promise<UserLoginResponseObject> => {
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
        token: data.token,
        message: data.message,
        user: data.user
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

/**
 * Envoie un email avec le lien de réinitialisation du mot de passe
 * @param data
 */
export const forgotPasswordAction = async (
    data: ForgotPasswordObject
): Promise<string> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    const resData = await response.json()

    if (!response.ok) {
        throw new Error(resData.message)
    }

    return resData.message
}

/**
 * Gère la réinitialisation du mot de passe
 * @param data
 */
export const resetPasswordAction = async (
    data: ResetPasswordObject
): Promise<string> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    const resData = await response.json()

    if (!response.ok) {
        throw new Error(resData.message)
    }

    return resData.message
}

/**
 * Vérifie la validité du token de réinitialisation
 * @param token
 */
export const verifyResetTokenAction = async (
    token: string
): Promise<boolean> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/verify-reset-token?token=${token}`)

    return response.ok
}

/**
 * Fonction pour se connecter via Google
 * @param idToken
 */
export const loginWithGoogleAction = async (
    idToken: string
): Promise<UserLoginResponseObject> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }

    return {
        token: data.token,
        message: data.message,
        user: data.user
    }
}
