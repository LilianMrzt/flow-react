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
import { updateTaskAction } from '@api/TasksApiCalls'
import {
    TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS
} from '@constants/select-options/TaskCreationModalPrioritySelectOptions'
import { MenuItemProps } from '@interfaces/ui/components/dropdowns/menu/MenuItemProps'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'

const BacklogTaskDropdown: FC<BacklogTaskDropdownProps> = ({
    isOpen,
    onClose,
    task,
    anchorRef,
    setIsHovered
}): ReactNode => {
    const {
        theme
    } = useTheme()

    const {
        loadedProject
    } = useLoadedProject()

    const {
        showAlert
    } = useAlert()

    if (!loadedProject) return null

    const [isTaskDeletionConfirmModalOpen, setIsTaskDeletionConfirmModalOpen] = useState(false)

    /**
     * Met à jour la priorité de la tâche si nécessaire
     */
    const handlePriorityChange = (
        newPriority: string
    ): void => {
        if (task.priority === newPriority) return

        updateTaskAction(loadedProject.slug, task.id, { priority: newPriority })
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

    return (
        <>
            <MenuDropdown
                isOpen={isOpen}
                anchorRef={anchorRef}
            >
                <MenuGroup>
                    <HoverMenuItem
                        label={'Priority'}
                        subMenuItems={PrioritySubMenuItems}
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
