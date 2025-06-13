import { TeamObject } from '@interfaces/objects/api/team/TeamObject'

export interface TeamMemberObject {
    id: string
    team: TeamObject
    role: 'admin' | 'member'
}
