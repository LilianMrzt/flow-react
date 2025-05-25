import { TaskLightObject } from '@interfaces/objects/api/task/TaskLightObject'
import { Dispatch, RefObject, SetStateAction } from 'react'

export interface BacklogTaskDropdownProps {
    isOpen: boolean
    onClose: () => void
    task: TaskLightObject
    anchorRef: RefObject<HTMLDivElement | null>
    subMenuRef: RefObject<HTMLDivElement | null>
    setIsHovered: Dispatch<SetStateAction<boolean>>
    sortedBacklogTasks: TaskLightObject[]
}
