import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { RefObject } from 'react'

export interface UseBacklogDragAndDropParams {
    task: TaskObject
    sortedBacklogTasks: TaskObject[]
    projectKey: string
    setDraggedTaskId: (id: string | null) => void
    setHoveredLineId: (id: string | null) => void
    setHoveredLinePosition: (pos: 'top' | 'bottom' | null) => void
    hoveredLinePosition: 'top' | 'bottom' | null
    showAlert: (msg: string, type: 'error' | 'success') => void
    taskRef: RefObject<HTMLDivElement | null>
}
