import { TaskObject } from '@interfaces/objects/api/task/TaskObject'

export interface TasksContextProps {
    tasks: TaskObject[]
    hasFetchedOnceTasks: boolean
    fetchTasks: () => Promise<void>
}
