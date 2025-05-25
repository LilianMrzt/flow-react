import { TaskLightObject } from '@interfaces/objects/api/task/TaskLightObject'

export interface TasksContextProps {
    tasks: TaskLightObject[]
    fetchTasks: () => Promise<void>
}
