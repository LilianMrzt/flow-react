import { SelectOption } from '@interfaces/objects/front/SelectOption'
import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'
import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'

export const COLUMN_MODIFICATION_BACKLOG_SELECT_OPTIONS = (
    loadedProject: ProjectObject | null
): SelectOption[] => {
    return [
        {
            value: 'no-status',
            label: 'No status'
        },
        ...(loadedProject?.columns ?? []).map((col: BoardColumnObject) => {
            return {
                value: col.id,
                label: col.name
            }
        })
    ]
}
