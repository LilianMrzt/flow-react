import React, { FC, ReactElement, ReactNode, useState } from 'react'
import {
    BacklogTaskProps
} from '@interfaces/ui/blocs/views/project-details/project-details-backlog-screen/BacklogTaskProps'
import Text from '@components/text/Text'
import { TableRow } from '@components/tables/TableRow'
import { TableCell } from '@src/ui/components/tables/TableCell'
import { useTheme } from '@hooks/contexts/ThemeContext'
import './backlog-task.css'
import { getSelectionFieldColor, getSelectionFieldIcon } from '@utils/IconsUtils'
import Icon from '@components/resources/Icon'
import Row from '@components/layout/Row'
import {
    TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS
} from '@constants/select-options/TaskCreationModalPrioritySelectOptions'
import { TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS } from '@constants/select-options/TaskCreationModalTypeSelectOptions'

const BacklogTask: FC<BacklogTaskProps> = ({
    task
}): ReactNode => {
    const {
        theme
    } = useTheme()

    const [isHovered, setIsHovered] = useState(false)

    /**
     * Gère l'événement de survol de la souris
     */
    const handleMouseEnter = (): void => {
        setIsHovered(true)
    }

    /**
     * Gère la fin du survol de la souris
     */
    const handleMouseLeave = (): void => {
        setIsHovered(false)
    }

    return (
        <TableRow
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            backgroundColor={isHovered ? theme.secondary : theme.surface}
            className={'backlog-task'}
        >
            <TableCell>
                <Row>
                    {getSelectionFieldIcon(task.priority, TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS) && (
                        <Icon
                            color={getSelectionFieldColor(task.priority, TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS)}
                        >
                            {getSelectionFieldIcon(task.priority, TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS) as ReactElement}
                        </Icon>
                    )}
                </Row>
            </TableCell>
            <TableCell>
                <Row
                    justifyContent={'start'}
                >
                    {getSelectionFieldIcon(task.type, TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS) && (
                        <Icon
                            size={18}
                            color={getSelectionFieldColor(task.type, TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS)}
                        >
                            {getSelectionFieldIcon(task.type, TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS) as ReactElement}
                        </Icon>
                    )}
                    <Text
                        maxLines={1}
                    >
                        {task.title}
                    </Text>
                </Row>
            </TableCell>
            <TableCell>
                <Text
                    maxLines={1}
                >
                    {task.title}
                </Text>
            </TableCell>
            <TableCell>
                <Text
                    maxLines={1}
                >
                    {task.title}
                </Text>
            </TableCell>
        </TableRow>
    )
}

export default BacklogTask
