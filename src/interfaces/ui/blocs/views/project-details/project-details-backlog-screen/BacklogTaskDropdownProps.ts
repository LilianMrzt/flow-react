import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { Dispatch, RefObject, SetStateAction } from 'react'

export interface BacklogTaskDropdownProps {
    isOpen: boolean
    onClose: () => void
    task: TaskObject
    anchorRef: RefObject<HTMLDivElement | null>
    subMenuRef: RefObject<HTMLDivElement | null>
    setIsHovered: Dispatch<SetStateAction<boolean>>
    sortedBacklogTasks: TaskObject[]
}
