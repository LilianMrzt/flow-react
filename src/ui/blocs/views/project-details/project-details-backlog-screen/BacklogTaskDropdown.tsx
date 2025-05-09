import React, { FC, ReactNode } from 'react'
import MenuDropdown from '@components/dropdowns/menu/MenuDropdown'
import {
    BacklogTaskDropdownProps
} from '@interfaces/ui/blocs/views/project-details/project-details-backlog-screen/BacklogTaskDropdownProps'
import MenuGroup from '@components/dropdowns/menu/MenuGroup'
import { TrashIcon } from '@resources/Icons'
import MenuItem from '@components/dropdowns/menu/MenuItem'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { useAlert } from '@hooks/contexts/AlertContext'
import { deleteTaskAction } from '@api/TasksApiCalls'
import { useTheme } from '@hooks/contexts/ThemeContext'

const BacklogTaskDropdown: FC<BacklogTaskDropdownProps> = ({
    isOpen,
    onClose,
    task
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

    const handleDeleteTask = async (): Promise<void> => {
        if(!loadedProject) return

        await deleteTaskAction(loadedProject.slug, task.id)
            .then(() => {
                showAlert('Task successfully deleted.' , 'success')
            }).catch((error) => {
                showAlert(error.message , 'error')
            })
    }

    return (
        <MenuDropdown
            isOpen={isOpen}
        >
            <MenuGroup>
                <MenuItem
                    label={'Delete task'}
                    onClick={handleDeleteTask}
                    onClose={onClose}
                    icon={<TrashIcon/>}
                    color={theme.error}
                />
            </MenuGroup>
        </MenuDropdown>
    )
}

export default BacklogTaskDropdown
