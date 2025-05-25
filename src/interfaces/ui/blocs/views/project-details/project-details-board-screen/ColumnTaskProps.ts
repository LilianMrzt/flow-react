import { TaskLightObject } from '@interfaces/objects/api/task/TaskLightObject'
import { Dispatch, SetStateAction } from 'react'

export interface ColumnTaskProps {
    task: TaskLightObject
    onHoverPosition: (position: 'top' | 'bottom') => void
    setDraggedTaskId: Dispatch<SetStateAction<string | null>>
    draggedTaskId: string | null
}
