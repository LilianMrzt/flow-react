import { SelectOption } from '@interfaces/objects/front/SelectOption'
import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'

export const COLUMN_MODIFICATION_BACKLOG_SELECT_OPTIONS = (
    columns: BoardColumnObject[] | null
): SelectOption[] => {
    return [
        {
            value: 'none',
            label: 'None'
        },
        ...(columns ?? [])
            .slice()
            .sort((a, b) => {
                return a.order - b.order
            })
            .map((col: BoardColumnObject) => {
                return {
                    value: col.id,
                    label: col.name
                }
            })
    ]
}
