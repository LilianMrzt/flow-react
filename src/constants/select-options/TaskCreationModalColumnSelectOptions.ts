import { SelectOption } from '@interfaces/objects/front/SelectOption'
import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'

export const TASK_CREATION_MODAL_COLUMN_SELECT_OPTIONS = (
    columns: BoardColumnObject[] | null
): SelectOption[] => {
    return [
        {
            value: 'none',
            label: 'None'
        },
        ...(columns ?? []).map((col) => {
            return {
                value: col.id,
                label: col.name
            }
        })
    ]
}
