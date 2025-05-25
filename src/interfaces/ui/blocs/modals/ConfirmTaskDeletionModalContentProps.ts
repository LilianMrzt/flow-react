import { Dispatch, SetStateAction } from 'react'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'

export interface ConfirmTaskDeletionModalContentProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    task: TaskObject
}
