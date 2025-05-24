import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { Dispatch, SetStateAction } from 'react'

export interface UseBoardDragAndDropParams {
    projectKey: string
    columnId: string
    tasks: TaskObject[]
    hoveredTaskId: string | null
    hoveredPosition: 'top' | 'bottom' | null
    setHoveredTaskId: Dispatch<SetStateAction<string | null>>
    setHoveredPosition:Dispatch<SetStateAction<'top' | 'bottom' | null>>
    setDraggedTaskId: Dispatch<SetStateAction<string | null>>
    showAlert: (msg: string, type: 'error' | 'success') => void
    setIsDragOver: Dispatch<SetStateAction<boolean>>
}
