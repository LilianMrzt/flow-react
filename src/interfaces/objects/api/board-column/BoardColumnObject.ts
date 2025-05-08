import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'

export interface BoardColumnObject {
    id: string
    name: string
    color: string
    order: number
    project: ProjectObject
    tasks: TaskObject[]
}
