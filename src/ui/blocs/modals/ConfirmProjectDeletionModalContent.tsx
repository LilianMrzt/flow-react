import React, { FC, ReactNode } from 'react'
import Column from '@components/layout/Column'
import Button from '@components/buttons/Button'
import Row from '@components/layout/Row'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { useAlert } from '@hooks/contexts/AlertContext'
import Text from '@components/text/Text'
import { deleteProjectAction } from '@api/ProjectsApiCalls'
import {
    ConfirmProjectDeletionModalContentProps
} from '@interfaces/ui/blocs/modals/ConfirmProjectDeletionModalContentProps'
import { useNavigate } from 'react-router-dom'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'

const ConfirmProjectDeletionModalContent: FC<ConfirmProjectDeletionModalContentProps> = ({
    setIsOpen
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

    const navigate = useNavigate()

    /**
     * Gestion de la fermeture du Modal
     */
    const handleClose = (): void => {
        setIsOpen(false)
    }

    /**
     * Gestion du click sur le bouton de submit
     */
    const handleDeleteProject = async (): Promise<void> => {
        if(!loadedProject) return

        await deleteProjectAction(loadedProject.id)
            .then(() => {
                showAlert('Project successfully deleted.' , 'success')
                navigate(ProjectsRoutes.projects.path)
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
                    maxLines={4}
                >
                    Are you sure you want to delete this project? This action cannot be undone and all associated tasks will also be deleted.
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
                    label={'Delete Permanently'}
                    onClick={handleDeleteProject}
                    backgroundColor={theme.error}
                    borderColor={theme.error}
                    hoverBackgroundColor={theme.hoverError}
                />
            </Row>
        </Column>
    )
}

export default ConfirmProjectDeletionModalContent
