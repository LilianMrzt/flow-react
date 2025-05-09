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

const BacklogTaskDropdown: FC<BacklogTaskDropdownProps> = ({
    isOpen,
    onClose,
    task
}): ReactNode => {
    const {
        theme
    } = useTheme()

    const [isTaskDeletionConfirmModalOpen, setIsTaskDeletionConfirmModalOpen] = useState(false)

    return (
        <>
            <MenuDropdown
                isOpen={isOpen}
            >
                <MenuGroup>
                    <MenuItem
                        label={'Delete task'}
                        onClick={() => {
                            setIsTaskDeletionConfirmModalOpen(true)
                        }}
                        onClose={onClose}
                        icon={<TrashIcon/>}
                        color={theme.error}
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
