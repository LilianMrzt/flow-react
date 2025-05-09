import React from 'react'
import { SelectOption } from '@interfaces/objects/front/SelectOption'
import { ChevronDownIcon, ChevronsDownIcon, ChevronsUpIcon, ChevronUpIcon, EqualIcon } from '@resources/Icons'
import { PriorityIconsColors } from '@constants/themes/icons-colors/PriorityIconsColors'

export const TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS: SelectOption[] = [
    {
        value: 'highest',
        label: 'Highest',
        icon: <ChevronsUpIcon/>,
        iconColor: PriorityIconsColors.HIGHEST
    },
    {
        value: 'high',
        label: 'High',
        icon: <ChevronUpIcon/>,
        iconColor: PriorityIconsColors.HIGH
    },

    {
        value: 'medium',
        label: 'Medium',
        icon: <EqualIcon/>,
        iconColor: PriorityIconsColors.MEDIUM
    },
    {
        value: 'low',
        label: 'Low',
        icon: <ChevronDownIcon/>,
        iconColor: PriorityIconsColors.LOW
    },

    {
        value: 'lowest',
        label: 'Lowest',
        icon: <ChevronsDownIcon/>,
        iconColor: PriorityIconsColors.LOWEST
    }
]
