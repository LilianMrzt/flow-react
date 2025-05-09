import React from 'react'
import { SelectOption } from '@interfaces/objects/front/SelectOption'
import { BugIcon, EvolutionIcon, TaskIcon } from '@resources/Icons'
import { TaskIconsColors } from '@constants/themes/icons-colors/TaskIconsColors'

export const TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS: SelectOption[] = [
    {
        label: 'Task',
        value: 'task',
        icon: <TaskIcon/>,
        iconColor: TaskIconsColors.TASK
    },
    {
        label: 'Bug',
        value: 'bug',
        icon: <BugIcon/>,
        iconColor: TaskIconsColors.BUG
    },
    {
        label: 'Evolution',
        value: 'evolution',
        icon: <EvolutionIcon/>,
        iconColor: TaskIconsColors.EVOLUTION
    }
]
