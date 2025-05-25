import { TaskObject } from '@interfaces/objects/api/task/TaskObject'

export interface TaskLightObject extends Omit<TaskObject, 'description'> {}
