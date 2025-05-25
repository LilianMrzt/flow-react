import React, { FC, ReactNode, useState } from 'react'
import TextField from '@components/inputs/TextField'
import Column from '@components/layout/Column'
import TextArea from '@components/inputs/TextArea'
import Row from '@components/layout/Row'
import Button from '@components/buttons/Button'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { ProjectCreationModalContentProps } from '@interfaces/ui/blocs/modals/ProjectCreationModalContentProps'
import { useAlert } from '@hooks/contexts/AlertContext'
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
        createProject
    } = useProjects()

    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [projectKey, setProjectKey] = useState('')

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
        if (!projectName || !projectKey) {
            showAlert('All mandatory fields need to be filled to create the project', 'warning')
            return
        }

        await createProject({
            name: projectName,
            description: projectDescription,
            key: projectKey
        }, handleClose)
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
                mandatory
            />
            <TextField
                label={'Key'}
                inputValue={projectKey}
                setInputValue={setProjectKey}
                placeholder={'Project Key'}
                mandatory
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
