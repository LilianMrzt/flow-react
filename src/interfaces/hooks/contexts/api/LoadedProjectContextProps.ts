import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'

export interface LoadedProjectContextProps {
    loadedProject: ProjectObject | null
    tasks: TaskObject[]
}
