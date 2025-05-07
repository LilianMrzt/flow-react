import { TeamObject } from '@interfaces/objects/api/team/TeamObject'

export interface MembershipObject {
    id: string
    role: string
    team: TeamObject
}
