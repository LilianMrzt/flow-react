import { TaskObject } from '@interfaces/objects/api/task/TaskObject'

export interface BacklogTaskProps {
    task: TaskObject
    sortedBacklogTasks: TaskObject[]
    draggedTaskId: string | null
    setDraggedTaskId: (id: string | null) => void
}
