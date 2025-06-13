import { UserObject } from '@interfaces/objects/api/user/UserObject'

export interface UserLoginResponseObject {
    token: string
    message: string
    user: UserObject
}
