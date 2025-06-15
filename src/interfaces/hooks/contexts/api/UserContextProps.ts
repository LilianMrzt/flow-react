import { UserObject } from '@interfaces/objects/api/user/UserObject'
import { Dispatch, SetStateAction } from 'react'

export interface UserContextProps {
    user: UserObject | null
    setUser: Dispatch<SetStateAction<UserObject | null>>
    logout: () => void
    isUserLoading: boolean
    setIsUserLoading: Dispatch<SetStateAction<boolean>>
}
