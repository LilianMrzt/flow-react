import { SelectOption } from '@interfaces/objects/front/SelectOption'
import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'
import { ProjectDetailsObject } from '@interfaces/objects/api/project/ProjectDetailsObject'

export const COLUMN_MODIFICATION_BACKLOG_SELECT_OPTIONS = (
    loadedProject: ProjectDetailsObject | null
): SelectOption[] => {
    return [
        {
            value: 'none',
            label: 'None'
        },
        ...(loadedProject?.columns ?? [])
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
