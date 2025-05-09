import React, { FC, ReactElement, ReactNode, useRef, useState } from 'react'
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
import IconButton from '@components/buttons/IconButton'
import { MoreIcon } from '@resources/Icons'
import MenuWrapper from '@components/dropdowns/menu/MenuWrapper'
import BacklogTaskDropdown from '@ui/blocs/views/project-details/project-details-backlog-screen/BacklogTaskDropdown'
import Select from '@components/dropdowns/select/Select'
import { updateTaskAction } from '@api/TasksApiCalls'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { useAlert } from '@hooks/contexts/AlertContext'
import {
    COLUMN_MODIFICATION_BACKLOG_SELECT_OPTIONS
} from '@constants/select-options/ColumnModificationBacklogSelectOptions'

const BacklogTask: FC<BacklogTaskProps> = ({
    task
}): ReactNode => {
    const {
        theme
    } = useTheme()

    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const [isHovered, setIsHovered] = useState(false)
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)

    const {
        loadedProject
    } = useLoadedProject()

    const {
        showAlert
    } = useAlert()

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

    /**
     * Gestion du changement de colonne / status d'une tache
     * @param value
     */
    const handleColumnChange = (value: string): void => {
        if (!loadedProject) return

        const columnId = value === 'no-status' ? null : value

        updateTaskAction(loadedProject.slug, task.id, { columnId: columnId })
            .then(() => {
                showAlert('Task successfully updated.', 'success')
            })
            .catch((error) => {
                showAlert(error.message, 'error')
            })
    }

    const moreIconButtonBackgroundColor = isHovered ? theme.secondary : theme.surface

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
                <Select
                    value={task.column?.id ?? 'no-status'}
                    onChange={handleColumnChange}
                    options={COLUMN_MODIFICATION_BACKLOG_SELECT_OPTIONS(loadedProject)}
                    backgroundColor={isHovered ? theme.secondary : theme.surface}
                    borderColor={isHovered ? theme.hoverSecondary : theme.outline}
                />
            </TableCell>
            <TableCell>
                <Row>
                    <MenuWrapper
                        onClose={() => {
                            setIsActionMenuOpen(false)
                        }}
                        anchorRef={wrapperRef}
                    >
                        <IconButton
                            onClick={() => {
                                setIsActionMenuOpen(true)
                            }}
                            iconSize={18}
                            backgroundColor={moreIconButtonBackgroundColor}
                            hoverBackgroundColor={theme.hoverSecondary}
                        >
                            <MoreIcon/>
                        </IconButton>
                        <BacklogTaskDropdown
                            isOpen={isActionMenuOpen}
                            onClose={() => {
                                setIsActionMenuOpen(false)
                            }}
                            task={task}
                            anchorRef={wrapperRef}
                        />
                    </MenuWrapper>
                </Row>
            </TableCell>
        </TableRow>
    )
}

export default BacklogTask
