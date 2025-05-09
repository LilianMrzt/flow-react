import { UserObject } from '@interfaces/objects/api/user/UserObject'

export interface ProjectMemberObject {
    id: string
    role: string
    user: UserObject
}
