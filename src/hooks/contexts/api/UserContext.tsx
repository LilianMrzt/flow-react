import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    type FC
} from 'react'
import { UserObject } from '@interfaces/objects/api/user/UserObject'
import { getUserFromTokenAction } from '@api/AuthApiCalls'
import { StorageConstants } from '@constants/StorageConstants'
import { UserContextProps } from '@interfaces/hooks/contexts/api/UserContextProps'
import { UserProviderProps } from '@interfaces/hooks/contexts/api/UserProviderProps'

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider: FC<UserProviderProps> = ({
    children
}) => {
    const [user, setUser] = useState<UserObject | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem(StorageConstants.token)
        if (token) {
            void getUserFromTokenAction(token)
                .then((res) => {
                    setUser(res)
                })
                .catch(() => {
                    setUser(null)
                    localStorage.removeItem(StorageConstants.token)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [])

    /**
     * Gestion de la déconnexion d'un utilisateur
     */
    const logout = (): void => {
        localStorage.removeItem(StorageConstants.token)
        setUser(null)
    }

    if (loading) {
        return (
            <div/>
        )
    }

    return (
        <UserContext.Provider
            value={{
                user,
                logout
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
