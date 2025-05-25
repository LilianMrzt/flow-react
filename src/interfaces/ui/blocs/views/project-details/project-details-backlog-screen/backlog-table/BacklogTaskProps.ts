import { TaskLightObject } from '@interfaces/objects/api/task/TaskLightObject'

export interface BacklogTaskProps {
    task: TaskLightObject
    sortedBacklogTasks: TaskLightObject[]
    draggedTaskId: string | null
    setDraggedTaskId: (id: string | null) => void
    setHoveredLineId: (id: string | null) => void
    hoveredLinePosition: 'top' | 'bottom' | null
    setHoveredLinePosition: (pos: 'top' | 'bottom' | null) => void
}
