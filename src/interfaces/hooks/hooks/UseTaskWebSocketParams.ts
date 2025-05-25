import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { Dispatch, SetStateAction } from 'react'

export interface UseTaskWebSocketParams {
    tasks: TaskObject[]
    setTasks: Dispatch<SetStateAction<TaskObject[]>>
}
