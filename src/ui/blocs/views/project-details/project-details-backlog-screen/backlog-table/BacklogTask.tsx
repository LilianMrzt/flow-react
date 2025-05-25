import React, { FC, ReactElement, ReactNode, useRef, useState } from 'react'
import BackTableCell from '@ui/blocs/views/project-details/project-details-backlog-screen/backlog-table/BackTableCell'
import Text from '@components/text/Text'
import './backlog-task.css'
import Icon from '@components/resources/Icon'
import { getSelectionFieldColor, getSelectionFieldIcon } from '@utils/IconsUtils'
import { TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS } from '@constants/select-options/TaskCreationModalPrioritySelectOptions'
import { TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS } from '@constants/select-options/TaskCreationModalTypeSelectOptions'
import Select from '@components/dropdowns/select/Select'
import { COLUMN_MODIFICATION_BACKLOG_SELECT_OPTIONS } from '@constants/select-options/ColumnModificationBacklogSelectOptions'
import { TASK_CREATION_MODAL_COLUMN_SELECT_OPTIONS } from '@constants/select-options/TaskCreationModalColumnSelectOptions'
import { updateColumnTasksOrdersAction } from '@api/TasksApiCalls'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useTheme } from '@hooks/contexts/ThemeContext'
import IconButton from '@components/buttons/IconButton'
import { EyeIcon, MoreIcon } from '@resources/Icons'
import BacklogTaskDropdown from '@ui/blocs/views/project-details/project-details-backlog-screen/BacklogTaskDropdown'
import MenuWrapper from '@components/dropdowns/menu/MenuWrapper'
import { BacklogTaskProps } from '@interfaces/ui/blocs/views/project-details/project-details-backlog-screen/backlog-table/BacklogTaskProps'
import { useBacklogDragAndDrop } from '@hooks/hooks/useBacklogDragAndDrop'
import { useTasks } from '@hooks/contexts/api/TasksProvider'
import { useBoardColumns } from '@hooks/contexts/api/BoardColumnsProvider'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { useNavigate } from 'react-router-dom'

const BacklogTask: FC<BacklogTaskProps> = ({
    task,
    sortedBacklogTasks,
    setDraggedTaskId,
    draggedTaskId,
    setHoveredLineId,
    setHoveredLinePosition,
    hoveredLinePosition
}): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    const {
        columns
    } = useBoardColumns()

    const {
        showAlert
    } = useAlert()

    const {
        theme
    } = useTheme()

    const {
        tasks
    } = useTasks()

    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const subMenuRef = useRef<HTMLDivElement | null>(null)
    const taskRef = useRef<HTMLDivElement | null>(null)

    const navigate = useNavigate()

    if (!loadedProject) return null

    const {
        handleDragStart,
        handleOnDragEnd,
        handleDrop,
        handleDragOver,
        handleDragLeave
    } = useBacklogDragAndDrop({
        task,
        sortedBacklogTasks,
        projectKey: loadedProject.key,
        setDraggedTaskId,
        setHoveredLineId,
        setHoveredLinePosition,
        hoveredLinePosition,
        showAlert,
        taskRef
    })

    const [isHovered, setIsHovered] = useState(false)
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)

    /**
     * Gère le changement de colonne d'une tâche via le menu déroulant.
     * @param value
     */
    const handleColumnChange = (value: string): void => {
        if (!loadedProject) return
        const columnId = value === TASK_CREATION_MODAL_COLUMN_SELECT_OPTIONS(columns)[0].value ? null : value

        const columnTasks = tasks
            .filter(t => {
                return t.column?.id === columnId
            })
            .sort((a, b) => {
                return (a.orderInColumn ?? 0) - (b.orderInColumn ?? 0)
            })

        const updates = [...columnTasks, task].map((t, i) => {
            return {
                id: t.id,
                columnId,
                orderInColumn: i
            }
        })

        updateColumnTasksOrdersAction(loadedProject.key, updates)
            .then(() => {
                setIsHovered(false)
            })
            .catch((error) => {
                showAlert(error.message, 'error')
            })
    }

    const moreIconButtonBackgroundColor =
        isActionMenuOpen && isHovered ? theme.hoverSecondary
            : isHovered ? theme.secondary
                : theme.surface

    return (
        <div
            ref={taskRef}
            className={'backlog-task'}
            style={{ backgroundColor: isHovered ? theme.secondary : theme.surface }}
            onMouseEnter={() => {
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragEnd={handleOnDragEnd}
            draggable
        >
            <BackTableCell
                width={100}
                justifyContent={'center'}
                draggedTaskId={draggedTaskId}
            >
                {getSelectionFieldIcon(task.priority, TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS) && (
                    <Icon
                        color={getSelectionFieldColor(task.priority, TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS)}
                    >
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
                <Text
                    maxLines={1}
                    fontSize={14}
                >
                    {task.key}
                </Text>
                <Text
                    maxLines={1}
                >
                    {task.title}
                </Text>
            </BackTableCell>
            <BackTableCell
                width={'calc(30% - 100px)'}
                draggedTaskId={draggedTaskId}
            >
                <Select
                    value={task.column?.id ?? COLUMN_MODIFICATION_BACKLOG_SELECT_OPTIONS(columns)[0].value}
                    onChange={handleColumnChange}
                    options={COLUMN_MODIFICATION_BACKLOG_SELECT_OPTIONS(columns)}
                    backgroundColor={isHovered ? theme.secondary : theme.surface}
                    borderColor={isHovered ? theme.hoverSecondary : theme.outline}
                />
            </BackTableCell>
            <BackTableCell
                width={100}
                justifyContent={'center'}
                draggedTaskId={draggedTaskId}
            >
                <IconButton
                    onClick={() => {
                        navigate(ProjectsRoutes.projectDetailsBacklogTaskModal.pathFn!({
                            key: loadedProject?.key,
                            taskId: task.key
                        }))
                    }}
                    iconSize={18}
                    backgroundColor={isHovered ? theme.secondary : theme.surface}
                    hoverBackgroundColor={theme.hoverSecondary}
                >
                    <EyeIcon/>
                </IconButton>
                <MenuWrapper
                    onClose={() => {
                        setHoveredLineId(null)
                        setHoveredLinePosition(null)
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
                            setHoveredLineId(null)
                            setHoveredLinePosition(null)
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
