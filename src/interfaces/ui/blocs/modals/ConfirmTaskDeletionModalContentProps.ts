import { Dispatch, SetStateAction } from 'react'
import { TaskLightObject } from '@interfaces/objects/api/task/TaskLightObject'

export interface ConfirmTaskDeletionModalContentProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    task: TaskLightObject
}
