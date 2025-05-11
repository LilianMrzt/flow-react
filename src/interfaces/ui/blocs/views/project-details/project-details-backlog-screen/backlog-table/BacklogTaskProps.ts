import { TaskObject } from '@interfaces/objects/api/task/TaskObject'

export interface BacklogTaskProps {
    task: TaskObject
    sortedBacklogTasks: TaskObject[]
    draggedTaskId: string | null
    setDraggedTaskId: (id: string | null) => void
    setHoveredLineId: (id: string | null) => void
    hoveredLinePosition: 'top' | 'bottom' | null
    setHoveredLinePosition: (pos: 'top' | 'bottom' | null) => void
}
