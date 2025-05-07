/**
 * Fonction pour se connecter via l'interface
 * @param userData
 */
export const loginUser = async (
    userData: { password: string; email: string }
): Promise<{ success: boolean; message: string; token?: string }> => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        const data = await response.json()

        if (!response.ok) {
            return { success: false, message: 'Login failed' }
        }

        return { success: true, message: 'Login successful', token: data.token }
    } catch (error) {
        console.error('Error logging in:', error)
        return { success: false, message: 'Network error' }
    }
}

/**
 * Fonction pour s'enregistrer via l'interface
 * @param userData
 */
export const registerUser = async (
    userData: { email: string; password: string; firstName: string; lastName: string }
): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        const data = await response.json()

        if (!response.ok) {
            return { success: false, message: data.message || 'Registration failed' }
        }

        return { success: true, message: data.message || 'Registration successful' }
    } catch (error) {
        console.error('Error registering user:', error)
        return { success: false, message: 'Network error' }
    }
}
