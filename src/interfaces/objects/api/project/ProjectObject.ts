import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { ProjectMemberObject } from '@interfaces/objects/api/project/ProjectMemberObject'

export interface ProjectObject {
    id: string
    name: string
    description?: string
    key: string
    totalTasksNumber: number
    columns: BoardColumnObject[]
    tasks: TaskObject[]
    members: ProjectMemberObject[]
    createdAt: string
    updatedAt: string
}
