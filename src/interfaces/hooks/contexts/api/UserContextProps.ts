import { UserObject } from '@interfaces/objects/api/user/UserObject'

export interface UserContextProps {
    user: UserObject | null
    logout: () => void
}
