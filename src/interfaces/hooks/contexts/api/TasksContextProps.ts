import { TaskObject } from '@interfaces/objects/api/task/TaskObject'

export interface TasksContextProps {
    tasks: TaskObject[]
    fetchTasks: () => Promise<void>
}
