import { TaskObject } from '@interfaces/objects/api/task/TaskObject'

export interface UseBoardDragAndDropResult {
    handleDrop: (taskId: string) => void
    getColumnTasks: () => TaskObject[]
    shouldShowLine: (taskId: string, previousTaskId: string | undefined, draggedTaskId: string | null) => boolean
}
