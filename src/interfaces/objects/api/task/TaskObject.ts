import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'
import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'
import { UserObject } from '@interfaces/objects/api/user/UserObject'

export interface TaskObject {
    id: string
    title: string
    description: string
    type: string
    priority: string
    project: ProjectObject
    column: BoardColumnObject | null
    assignedUser: UserObject | null
    orderInColumn: number | null
    orderInBacklog: number | null
}
