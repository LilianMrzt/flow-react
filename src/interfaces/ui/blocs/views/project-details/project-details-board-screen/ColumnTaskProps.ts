import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { Dispatch, SetStateAction } from 'react'

export interface ColumnTaskProps {
    task: TaskObject
    onHoverPosition: (position: 'top' | 'bottom') => void
    setDraggedTaskId: Dispatch<SetStateAction<string | null>>
    draggedTaskId: string | null
}
