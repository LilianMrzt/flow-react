import { TaskObject } from '@interfaces/objects/api/task/TaskObject'

export interface ColumnTaskProps {
    task: TaskObject
    onHoverPosition: (position: 'top' | 'bottom') => void
    setDraggedTaskId: (id: string) => void
}
