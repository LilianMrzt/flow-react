import { SelectOption } from '@interfaces/objects/front/SelectOption'
import { ProjectDetailsObject } from '@interfaces/objects/api/project/ProjectDetailsObject'

export const TASK_CREATION_MODAL_COLUMN_SELECT_OPTIONS = (
    loadedProject: ProjectDetailsObject | null
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
