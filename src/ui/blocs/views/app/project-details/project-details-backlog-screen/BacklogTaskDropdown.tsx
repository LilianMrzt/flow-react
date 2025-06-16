import React, { FC, ReactNode, useState } from 'react'
import MenuDropdown from '@components/dropdowns/menu/MenuDropdown'
import {
    BacklogTaskDropdownProps
} from '@interfaces/ui/blocs/views/project-details/project-details-backlog-screen/BacklogTaskDropdownProps'
import MenuGroup from '@components/dropdowns/menu/MenuGroup'
import { TrashIcon } from '@resources/Icons'
import MenuItem from '@components/dropdowns/menu/MenuItem'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Modal from '@components/layout/Modal'
import ConfirmTaskDeletionModalContent from '@ui/blocs/modals/ConfirmTaskDeletionModalContent'
import HoverMenuItem from '@components/dropdowns/menu/HoverMenuItem'
import Separator from '@components/layout/Separator'
import { updateBacklogTasksOrdersAction, updateTaskAction } from '@api/TasksApiCalls'
import {
    TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS
} from '@constants/select-options/TaskCreationModalPrioritySelectOptions'
import { MenuItemProps } from '@interfaces/ui/components/dropdowns/menu/MenuItemProps'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { BACKLOG_MOVE_TASK_OPTIONS } from '@constants/select-options/BacklogMoveTaskOptions'

const BacklogTaskDropdown: FC<BacklogTaskDropdownProps> = ({
    isOpen,
    onClose,
    task,
    anchorRef,
    dropdownRef,
    subMenuRef,
    setIsHovered,
    sortedBacklogTasks
}): ReactNode => {
    const { theme } = useTheme()
    const { loadedProject } = useLoadedProject()
    const { showAlert } = useAlert()

    if (!loadedProject) return null

    const [isTaskDeletionConfirmModalOpen, setIsTaskDeletionConfirmModalOpen] = useState(false)

    /**
     * Met à jour la priorité de la tâche si nécessaire
     */
    const handlePriorityChange = (
        newPriority: string
    ): void => {
        if (task.priority === newPriority) return

        updateTaskAction(loadedProject.key, task.id, { priority: newPriority })
            .then(() => {
                setIsHovered(false)
            })
            .catch((error) => {
                showAlert(error.message, 'error')
            })
    }

    /**
     * Retourne les sous-options de priorité
     */
    const PrioritySubMenuItems = (): MenuItemProps[] => {
        return TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS.map((option) => {
            return {
                label: option.label,
                icon: option.icon,
                color: option.iconColor,
                onClick: (): void => {
                    return handlePriorityChange(option.value)
                },
                onClose
            }
        })
    }

    /**
     * Met à jour la priorité de la tâche si nécessaire
     */
    const handleTaskReorder = async (mode: 'first' | 'top' | 'bottom' | 'last'): Promise<void> => {
        const index = sortedBacklogTasks.findIndex(t => {
            return t.id === task.id
        })
        if (index === -1) return

        let newIndex = index

        switch (mode) {
        case 'first':
            newIndex = 0
            break
        case 'top':
            newIndex = Math.max(0, index - 1)
            break
        case 'bottom':
            newIndex = Math.min(sortedBacklogTasks.length - 1, index + 1)
            break
        case 'last':
            newIndex = sortedBacklogTasks.length - 1
            break
        }

        if (newIndex === index) return

        const reordered = [...sortedBacklogTasks]
        const [movedTask] = reordered.splice(index, 1)
        reordered.splice(newIndex, 0, movedTask)

        const updates = reordered
            .map((t, i) => {
                return { id: t.id, orderInBacklog: i }
            })
            .filter((u, i) => {
                return sortedBacklogTasks[i].id !== u.id || sortedBacklogTasks[i].orderInBacklog !== i
            })

        await updateBacklogTasksOrdersAction(loadedProject.key, updates)
            .catch((err) => {
                showAlert(err.message, 'error')
            })
        setIsHovered(false)

        setIsHovered(false)
    }

    /**
     * Retourne les sous-options de priorité
     */
    const MoveTaskSubMenuItems = (): MenuItemProps[] => {
        return BACKLOG_MOVE_TASK_OPTIONS.map((option) => {
            return {
                label: option.label,
                onClick: (): void => {
                    void handleTaskReorder(option.value as 'first' | 'top' | 'bottom' | 'last')
                },
                onClose
            }
        })
    }

    return (
        <>
            <MenuDropdown
                isOpen={isOpen}
                anchorRef={anchorRef}
                dropdownRef={dropdownRef}
            >
                <MenuGroup>
                    <HoverMenuItem
                        label={'Move task'}
                        subMenuItems={MoveTaskSubMenuItems}
                        submenuRef={subMenuRef}
                        dropdownRef={subMenuRef}
                    />
                    <HoverMenuItem
                        label={'Priority'}
                        subMenuItems={PrioritySubMenuItems}
                        submenuRef={subMenuRef}
                        dropdownRef={subMenuRef}
                    />
                </MenuGroup>
                <Separator/>
                <MenuGroup>
                    <MenuItem
                        label={'Delete task'}
                        onClick={() => {
                            setIsTaskDeletionConfirmModalOpen(true)
                        }}
                        onClose={onClose}
                        icon={<TrashIcon/>}
                        color={theme.error}
                        iconColor={theme.error}
                    />
                </MenuGroup>
            </MenuDropdown>
            <Modal
                isOpen={isTaskDeletionConfirmModalOpen}
                onClose={() => {
                    setIsTaskDeletionConfirmModalOpen(false)
                }}
                label={'Confirm deletion'}
                icon={<TrashIcon/>}
                iconColor={theme.error}
            >
                <ConfirmTaskDeletionModalContent
                    setIsOpen={setIsTaskDeletionConfirmModalOpen}
                    task={task}
                />
            </Modal>
        </>
    )
}

export default BacklogTaskDropdown
