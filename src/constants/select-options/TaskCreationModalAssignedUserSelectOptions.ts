import { SelectOption } from '@interfaces/objects/front/SelectOption'
import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'

export const TASK_CREATION_MODAL_ASSIGNEE_SELECT_OPTIONS = (
    loadedProject: ProjectObject | null
): SelectOption[] => {
    return [
        {
            value: 'none',
            label: 'None'
        },
        ...(loadedProject?.members ?? []).map((member) => {
            return {
                value: member.user.id,
                label: `${member.user.firstName} ${member.user.lastName}`
            }
        })
    ]
}
