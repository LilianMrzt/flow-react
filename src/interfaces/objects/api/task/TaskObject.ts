import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'
import { UserObject } from '@interfaces/objects/api/user/UserObject'

export interface TaskObject {
    id: string
    key: string
    title: string
    type: string
    priority: string
    description: string
    column: BoardColumnObject | null
    assignedUser: UserObject | null
    orderInColumn: number | null
    orderInBacklog: number | null
}
