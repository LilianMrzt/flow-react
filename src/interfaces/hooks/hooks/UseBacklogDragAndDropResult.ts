import { DragEvent } from 'react'

export interface UseBacklogDragAndDropResult {
    handleDragStart: (e: DragEvent<HTMLDivElement>) => void
    handleOnDragEnd: () => void
    handleDrop: (e: DragEvent<HTMLDivElement>) => void
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void
    handleDragLeave: () => void
}
