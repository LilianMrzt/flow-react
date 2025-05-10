import { SelectOption } from '@interfaces/objects/front/SelectOption'

export const BACKLOG_MOVE_TASK_OPTIONS: SelectOption[] = [
    {
        value: 'first',
        label: 'To the top of the backlog'
    },
    {
        value: 'top',
        label: 'To the top'
    },

    {
        value: 'bottom',
        label: 'To the bottom'
    },
    {
        value: 'last',
        label: 'To the bottom of the backlog'
    }
]
