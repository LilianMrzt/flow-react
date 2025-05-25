import { TaskLightObject } from '@interfaces/objects/api/task/TaskLightObject'
import { Dispatch, SetStateAction } from 'react'

export interface UseTaskWebSocketParams {
    tasks: TaskLightObject[]
    setTasks: Dispatch<SetStateAction<TaskLightObject[]>>
}
