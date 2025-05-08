import React, { FC, ReactNode, useState } from 'react'
import TextField from '@components/inputs/TextField'
import Column from '@components/layout/Column'
import TextArea from '@components/inputs/TextArea'
import Row from '@components/layout/Row'
import Button from '@components/buttons/Button'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { ProjectCreationModalContentProps } from '@interfaces/ui/blocs/modals/ProjectCreationModalContentProps'
import { useAlert } from '@hooks/contexts/AlertContext'
import { createProjectAction } from '@api/ProjectsApiCalls'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'

const ProjectCreationModalContent: FC<ProjectCreationModalContentProps> = ({
    setIsOpen
}): ReactNode => {
    const {
        theme
    } = useTheme()

    const {
        showAlert
    } = useAlert()

    const {
        createProjectStateUpdate
    } = useProjects()

    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')

    /**
     * Gestion de la fermeture du Modal
     */
    const handleClose = (): void => {
        setIsOpen(false)
    }

    /**
     * Gestion du click sur le bouton de submit
     */
    const handleSubmit = async (): Promise<void> => {
        if (!projectName || !projectDescription) {
            showAlert('All fields need to be filled to create the project', 'warning')
            return
        }

        await createProjectAction({
            name: projectName,
            description: projectDescription
        }).then((res) => {
            showAlert('Project successfully created.' , 'success')
            createProjectStateUpdate(res)
            handleClose()
        }).catch((error) => {
            showAlert(error.message , 'error')
        })
    }

    return (
        <Column
            alignItems={'flex-start'}
            gap={16}
        >
            <TextField
                label={'Name'}
                inputValue={projectName}
                setInputValue={setProjectName}
                placeholder={'Project name'}
            />
            <TextArea
                inputValue={projectDescription}
                setInputValue={setProjectDescription}
                label={'Description'}
                placeholder={'Project description'}
            />
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
                    label={'Create project'}
                    onClick={handleSubmit}
                />
            </Row>
        </Column>
    )
}

export default ProjectCreationModalContent
