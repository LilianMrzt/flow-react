import { TeamMemberObject } from '@interfaces/objects/api/team/TeamMemberObject'

export interface UserObject {
    id: string
    email: string
    firstName?: string
    lastName?: string
    memberships: TeamMemberObject[]
    color: string
}
