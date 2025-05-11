import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'
import { Dispatch, SetStateAction } from 'react'

export interface BoardColumnProps {
    column: BoardColumnObject
    draggedTaskId: string | null
    setDraggedTaskId: Dispatch<SetStateAction<string | null>>
}
