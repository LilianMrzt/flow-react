import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    type FC, useRef
} from 'react'
import { UserObject } from '@interfaces/objects/api/user/UserObject'
import { getUserFromTokenAction } from '@api/AuthApiCalls'
import { StorageConstants } from '@constants/StorageConstants'
import { UserContextProps } from '@interfaces/hooks/contexts/api/UserContextProps'
import { UserProviderProps } from '@interfaces/hooks/contexts/api/UserProviderProps'
import { useAlert } from '@hooks/contexts/AlertContext'

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider: FC<UserProviderProps> = ({
    children
}) => {
    const { showAlert } = useAlert()

    const hasFetched = useRef(false)

    const [user, setUser] = useState<UserObject | null>(null)

    /**
     * Récupération de l'utilisateur connecté
     */
    const handleFetchUser = (): void => {
        const token = localStorage.getItem(StorageConstants.token)

        if (hasFetched.current) return
        hasFetched.current = true

        if(token && !user) {
            getUserFromTokenAction(token)
                .then((res) => {
                    setUser(res)
                })
                .catch((error) => {
                    showAlert(error.message, 'error')
                })
        }
    }

    useEffect(() => {
        handleFetchUser()
    }, [])

    /**
     * Gestion de la déconnexion d'un utilisateur
     */
    const logout = (): void => {
        localStorage.removeItem(StorageConstants.token)
        setUser(null)
        window.location.reload()
    }

    return (
        <UserContext.Provider
            value={{
                user,
                logout,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
