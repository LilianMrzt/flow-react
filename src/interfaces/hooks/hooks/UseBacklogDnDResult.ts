import { DragEvent } from 'react'

export interface UseBacklogDnDResult {
    handleDragStart: (e: DragEvent<HTMLDivElement>) => void
    handleOnDragEnd: () => void
    handleDrop: (e: DragEvent<HTMLDivElement>) => void
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void
    handleDragLeave: () => void
}
