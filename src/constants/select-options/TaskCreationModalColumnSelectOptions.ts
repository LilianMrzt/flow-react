import { SelectOption } from '@interfaces/objects/front/SelectOption'
import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'

export const TASK_CREATION_MODAL_COLUMN_SELECT_OPTIONS = (
    loadedProject: ProjectObject | null
): SelectOption[] => {
    return [
        {
            value: 'none',
            label: 'None'
        },
        ...(loadedProject?.columns ?? []).map((col) => {
            return {
                value: col.id,
                label: col.name
            }
        })
    ]
}
