import { Dispatch, SetStateAction } from 'react'
import { TaskLightObject } from '@interfaces/objects/api/task/TaskLightObject'

export interface UseBoardDragAndDropParams {
    projectKey: string
    columnId: string
    tasks: TaskLightObject[]
    hoveredTaskId: string | null
    hoveredPosition: 'top' | 'bottom' | null
    setHoveredTaskId: Dispatch<SetStateAction<string | null>>
    setHoveredPosition:Dispatch<SetStateAction<'top' | 'bottom' | null>>
    setDraggedTaskId: Dispatch<SetStateAction<string | null>>
    showAlert: (msg: string, type: 'error' | 'success') => void
    setIsDragOver: Dispatch<SetStateAction<boolean>>
}
