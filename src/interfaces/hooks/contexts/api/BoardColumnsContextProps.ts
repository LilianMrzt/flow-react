import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'

export interface BoardColumnsContextProps {
    columns: BoardColumnObject[]
    fetchColumns: () => Promise<void>
}
