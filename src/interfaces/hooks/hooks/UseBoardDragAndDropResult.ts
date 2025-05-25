import { TaskLightObject } from '@interfaces/objects/api/task/TaskLightObject'

export interface UseBoardDragAndDropResult {
    handleDrop: (taskId: string) => void
    getColumnTasks: () => TaskLightObject[]
    shouldShowLine: (taskId: string, previousTaskId: string | undefined, draggedTaskId: string | null) => boolean
}
