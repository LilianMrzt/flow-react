import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'

export interface BoardColumnsContextProps {
    columns: BoardColumnObject[]
    hasFetchedOnceColumns: boolean
    fetchColumns: () => Promise<void>
}
