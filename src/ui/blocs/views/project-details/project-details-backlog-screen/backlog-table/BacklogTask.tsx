import React, { FC, ReactElement, ReactNode, useRef, useState } from 'react'
import BackTableCell
    from '@ui/blocs/views/project-details/project-details-backlog-screen/backlog-table/BackTableCell'
import Text from '@components/text/Text'
import './backlog-task.css'
import Icon from '@components/resources/Icon'
import { getSelectionFieldColor, getSelectionFieldIcon } from '@utils/IconsUtils'
import {
    TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS
} from '@constants/select-options/TaskCreationModalPrioritySelectOptions'
import { TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS } from '@constants/select-options/TaskCreationModalTypeSelectOptions'
import Select from '@components/dropdowns/select/Select'
import {
    COLUMN_MODIFICATION_BACKLOG_SELECT_OPTIONS
} from '@constants/select-options/ColumnModificationBacklogSelectOptions'
import {
    TASK_CREATION_MODAL_COLUMN_SELECT_OPTIONS
} from '@constants/select-options/TaskCreationModalColumnSelectOptions'
import { updateBacklogTasksOrdersAction, updateTaskAction } from '@api/TasksApiCalls'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useTheme } from '@hooks/contexts/ThemeContext'
import IconButton from '@components/buttons/IconButton'
import { MoreIcon } from '@resources/Icons'
import BacklogTaskDropdown from '@ui/blocs/views/project-details/project-details-backlog-screen/BacklogTaskDropdown'
import MenuWrapper from '@components/dropdowns/menu/MenuWrapper'
import { createDragImageFromElement } from '@utils/DragUtils'
import {
    BacklogTaskProps
} from '@interfaces/ui/blocs/views/project-details/project-details-backlog-screen/backlog-table/BacklogTaskProps'

const BacklogTask: FC<BacklogTaskProps> = ({
    task,
    sortedBacklogTasks,
    setDraggedTaskId,
    draggedTaskId
}): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    const {
        showAlert
    } = useAlert()

    const {
        theme
    } = useTheme()

    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const subMenuRef = useRef<HTMLDivElement | null>(null)
    const ref = useRef<HTMLTableRowElement | null>(null)
    const mouseYRef = useRef<number | null>(null)

    const [isHovered, setIsHovered] = useState(false)
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)
    const [dragOverPosition, setDragOverPosition] = useState<'top' | 'bottom' | null>(null)

    const handleColumnChange = (value: string): void => {
        if (!loadedProject) return
        const columnId = value === TASK_CREATION_MODAL_COLUMN_SELECT_OPTIONS(loadedProject)[0].value ? null : value
        updateTaskAction(loadedProject.slug, task.id, { columnId })
            .then(() => {
                showAlert('Task successfully updated.', 'success')
                setIsHovered(false)
            })
            .catch((error) => {
                showAlert(error.message, 'error')
            })
    }

    const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>): void => {
        e.dataTransfer.setData('text/plain', task.id)
        setDraggedTaskId(task.id)
        if (ref.current) {
            createDragImageFromElement(e, ref.current)
        }
    }

    const handleOnDragEnd = (): void => {
        setDraggedTaskId(null)
    }

    const handleDrop = (e: React.DragEvent<HTMLTableRowElement>): void => {
        if (!loadedProject || dragOverPosition === null) return
        e.preventDefault()

        const draggedTaskId = e.dataTransfer.getData('text/plain')
        if (!draggedTaskId || draggedTaskId === task.id) {
            setDragOverPosition(null)
            return
        }

        const draggedIndex = sortedBacklogTasks.findIndex(t => {
            return t.id === draggedTaskId
        })
        const targetIndex = sortedBacklogTasks.findIndex(t => {
            return t.id === task.id
        })
        if (draggedIndex === -1 || targetIndex === -1) return

        const reordered = [...sortedBacklogTasks]
        const [movedTask] = reordered.splice(draggedIndex, 1)
        reordered.splice(dragOverPosition === 'top' ? targetIndex : targetIndex + 1, 0, movedTask)

        const updates = reordered
            .map((t, i) => {
                return { id: t.id, orderInBacklog: i }
            })
            .filter((u, i) => {
                return sortedBacklogTasks[i].id !== u.id || sortedBacklogTasks[i].orderInBacklog !== i
            })

        setDragOverPosition(null)

        updateBacklogTasksOrdersAction(loadedProject.slug, updates).catch(err => {
            showAlert(err.message, 'error')
        })
    }

    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>): void => {
        e.preventDefault()
        mouseYRef.current = e.clientY

        const rect = e.currentTarget.getBoundingClientRect()
        const position = e.clientY <= rect.top + rect.height / 2 ? 'top' : 'bottom'
        setDragOverPosition(position)
    }

    const handleDragLeave = (): void => {
        return setDragOverPosition(null)
    }

    const moreIconButtonBackgroundColor =
        isActionMenuOpen && isHovered ? theme.hoverSecondary
            : isHovered ? theme.secondary
                : theme.surface

    return (
        <div
            ref={ref}
            className={`backlog-task ${dragOverPosition === 'top' ? 'drag-over-top' : ''} ${dragOverPosition === 'bottom' ? 'drag-over-bottom' : ''}`}
            style={{
                backgroundColor: isHovered ? theme.secondary : theme.surface
            }}
            onMouseEnter={(): void => {
                return setIsHovered(true)
            }}
            onMouseLeave={(): void => {
                return setIsHovered(false)
            }}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnd={handleOnDragEnd}
            draggable
        >
            <BackTableCell
                width={100}
                justifyContent={'center'}
                draggedTaskId={draggedTaskId}
            >
                {getSelectionFieldIcon(task.priority, TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS) && (
                    <Icon color={getSelectionFieldColor(task.priority, TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS)}>
                        {getSelectionFieldIcon(task.priority, TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS) as ReactElement}
                    </Icon>
                )}
            </BackTableCell>
            <BackTableCell
                width={'calc(70% - 100px)'}
                draggedTaskId={draggedTaskId}
            >
                {getSelectionFieldIcon(task.type, TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS) && (
                    <Icon
                        size={18}
                        color={getSelectionFieldColor(task.type, TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS)}
                    >
                        {getSelectionFieldIcon(task.type, TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS) as ReactElement}
                    </Icon>
                )}
                <Text maxLines={1}>{task.title}</Text>
            </BackTableCell>
            <BackTableCell
                width={'calc(30% - 100px)'}
                draggedTaskId={draggedTaskId}
            >
                <Select
                    value={task.column?.id ?? COLUMN_MODIFICATION_BACKLOG_SELECT_OPTIONS(loadedProject)[0].value}
                    onChange={handleColumnChange}
                    options={COLUMN_MODIFICATION_BACKLOG_SELECT_OPTIONS(loadedProject)}
                    backgroundColor={isHovered ? theme.secondary : theme.surface}
                    borderColor={isHovered ? theme.hoverSecondary : theme.outline}
                />
            </BackTableCell>
            <BackTableCell
                width={100}
                justifyContent={'center'}
                draggedTaskId={draggedTaskId}
            >
                <MenuWrapper
                    onClose={() => {
                        setIsActionMenuOpen(false)
                        setIsHovered(false)
                    }}
                    anchorRef={wrapperRef}
                    isMenuOpen={isActionMenuOpen}
                    subMenuRef={subMenuRef}
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
                            setIsHovered(false)
                        }}
                        task={task}
                        anchorRef={wrapperRef}
                        subMenuRef={subMenuRef}
                        setIsHovered={setIsHovered}
                        sortedBacklogTasks={sortedBacklogTasks}
                    />
                </MenuWrapper>
            </BackTableCell>
        </div>
    )
}

export default BacklogTask
