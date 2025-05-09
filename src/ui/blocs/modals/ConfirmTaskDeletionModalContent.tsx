import React, { FC, ReactNode } from 'react'
import { ConfirmTaskDeletionModalContentProps } from '@interfaces/ui/blocs/modals/ConfirmTaskDeletionModalContentProps'
import Column from '@components/layout/Column'
import Button from '@components/buttons/Button'
import Row from '@components/layout/Row'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { deleteTaskAction } from '@api/TasksApiCalls'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { useAlert } from '@hooks/contexts/AlertContext'
import Text from '@components/text/Text'

const ConfirmTaskDeletionModalContent: FC<ConfirmTaskDeletionModalContentProps> = ({
    setIsOpen,
    task
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

    /**
     * Gestion de la fermeture du Modal
     */
    const handleClose = (): void => {
        setIsOpen(false)
    }

    /**
     * Gestion du click sur le bouton de submit
     */
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
        <Column
            alignItems={'flex-start'}
            gap={16}
        >
            <Column
                alignItems={'flex-start'}
                gap={4}
            >
                <Text
                    fontSize={14}
                    color={theme.textSecondary}
                >
                    {`Are you sure you want to delete the “${task.title}” task?`}
                </Text>
                <Text
                    fontSize={14}
                    color={theme.textSecondary}
                >
                    This action is irreversible and cannot be undone.
                </Text>
            </Column>
            <Row
                justifyContent={'flex-end'}
            >
                <Button
                    label={'Cancel'}
                    onClick={handleClose}
                    backgroundColor={theme.surface}
                    hoverBackgroundColor={theme.secondary}
                    borderColor={theme.outline}
                    color={theme.text}
                    hoverColor={theme.primary}
                />
                <Button
                    label={'Delete'}
                    onClick={handleDeleteTask}
                    backgroundColor={theme.error}
                    borderColor={theme.error}
                    hoverBackgroundColor={theme.hoverError}
                />
            </Row>
        </Column>
    )
}

export default ConfirmTaskDeletionModalContent
