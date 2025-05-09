import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { RefObject } from 'react'

export interface BacklogTaskDropdownProps {
    isOpen: boolean
    onClose: () => void
    task: TaskObject
    anchorRef: RefObject<HTMLDivElement | null>
}
