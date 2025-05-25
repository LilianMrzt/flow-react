import { SelectOption } from '@interfaces/objects/front/SelectOption'
import { ProjectDetailsObject } from '@interfaces/objects/api/project/ProjectDetailsObject'

export const TASK_CREATION_MODAL_ASSIGNEE_SELECT_OPTIONS = (
    loadedProject: ProjectDetailsObject | null
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
