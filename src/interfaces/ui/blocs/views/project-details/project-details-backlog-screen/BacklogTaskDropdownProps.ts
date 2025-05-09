import { TaskObject } from '@interfaces/objects/api/task/TaskObject'

export interface BacklogTaskDropdownProps {
    isOpen: boolean
    onClose: () => void
    task: TaskObject
}
