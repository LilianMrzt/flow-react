import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'

export interface ProjectObject {
    id: string
    name: string
    description?: string
    slug: string
    columns: BoardColumnObject[]
    tasks: TaskObject[]
    createdAt: string
    updatedAt: string
}
