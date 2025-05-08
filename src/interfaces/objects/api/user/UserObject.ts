import { MembershipObject } from '@interfaces/objects/api/team/MembershipObject '

export interface UserObject {
    id: string
    email: string
    firstName?: string
    lastName?: string
    memberships: MembershipObject[]
    color: string
}
