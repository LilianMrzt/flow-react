import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { Dispatch, SetStateAction } from 'react'

export interface UseBoardDragAndDropParams {
    projectSlug: string
    columnId: string
    tasks: TaskObject[]
    hoveredTaskId: string | null
    hoveredPosition: 'top' | 'bottom' | null
    setHoveredTaskId: (id: string | null) => void
    setHoveredPosition: (pos: 'top' | 'bottom' | null) => void
    setDraggedTaskId: (id: string | null) => void
    showAlert: (msg: string, type: 'error' | 'success') => void
    setIsDragOver: Dispatch<SetStateAction<boolean>>
}
