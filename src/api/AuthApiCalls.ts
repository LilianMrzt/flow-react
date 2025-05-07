/**
 * Fonction pour se connecter via l'interface
 * @param userData
 */
export const loginUserAction = async (
    userData: { password: string; email: string }
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

    return { token: data.token }
}

/**
 * Fonction pour s'enregistrer via l'interface
 * @param userData
 */
export const registerUserAction = async (
    userData: { email: string; password: string; firstName: string; lastName: string }
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
