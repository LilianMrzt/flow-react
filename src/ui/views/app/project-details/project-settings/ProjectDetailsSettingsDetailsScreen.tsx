import React, { ReactNode, useState } from 'react'
import Screen from '@components/layout/screen/Screen'
import Text from '@components/text/Text'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { PROJECT_DETAILS_SETTINGS_BREADCRUMBS } from '@constants/breadcrumbs/ProjectDetailsSettingsBreadcrumbs'
import Card from '@components/layout/Card'
import TextField from '@components/inputs/TextField'
import TextArea from '@components/inputs/TextArea'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Column from '@components/layout/Column'
import Button from '@components/buttons/Button'
import { SaveIcon } from '@resources/Icons'
import { useAlert } from '@hooks/contexts/AlertContext'
import { updateProjectAction } from '@api/ProjectsApiCalls'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'

const ProjectDetailsSettingsDetailsScreen = (): ReactNode => {
    const {
        loadedProject,
        fetchProject
    } = useLoadedProject()

    const {
        theme
    } = useTheme()

    const {
        showAlert
    } = useAlert()

    if (!loadedProject) return null

    const [newProjectName, setNewProjectName] = useState(loadedProject.name)
    const [newProjectKey, setNewProjectKey] = useState(loadedProject.key)
    const [newProjectDescription, setNewProjectDescription] = useState(loadedProject.description ?? '')

    /**
     * Gestion de la modification des champs des details du projet
     */
    const handleSubmit = async (): Promise<void> => {
        if (!loadedProject) return

        const updateData: {
            name?: string,
            key?: string,
            description?: string
        } = {}

        if (newProjectName !== loadedProject.name) updateData.name = newProjectName
        if (newProjectKey !== loadedProject.key) updateData.key = newProjectKey
        if (newProjectDescription !== loadedProject.description) updateData.description = newProjectDescription

        updateProjectAction(loadedProject.id, updateData)
            .then(async (updatedProject) => {
                showAlert('Project successfully updated.', 'success')
                if (newProjectKey !== loadedProject.key) {
                    window.location.href = ProjectsRoutes.projectDetailsDashboard.pathFn!({ key: updatedProject.key })
                    return
                }
                await fetchProject()
            })
            .catch((error) => {
                showAlert(error.message, 'error')
            })
    }

    const isButtonDisabled = newProjectName === loadedProject.name && newProjectKey === loadedProject.key && newProjectDescription === loadedProject.description

    return (
        <Screen
            label={'Project settings - Details'}
            description={'Details'}
            breadCrumbsRoutes={PROJECT_DETAILS_SETTINGS_BREADCRUMBS(loadedProject)}
        >
            <Card
                alignItems={'start'}
                width={'100%'}
            >
                <Column
                    alignItems={'start'}
                >
                    <Text
                        fontSize={18}
                        fontWeight={600}
                    >
                        Edit project
                    </Text>
                    <Text
                        fontSize={14}
                        color={theme.textSecondary}
                    >
                        Edit your project&#39;s basic details
                    </Text>
                </Column>
                <TextField
                    inputValue={newProjectName}
                    setInputValue={setNewProjectName}
                    label={'Project name'}
                    placeholder={loadedProject.name}
                />
                <TextField
                    inputValue={newProjectKey}
                    setInputValue={setNewProjectKey}
                    label={'Project key'}
                    placeholder={loadedProject.key}
                />
                <TextArea
                    inputValue={newProjectDescription}
                    setInputValue={setNewProjectDescription}
                    label={'Project description'}
                    placeholder={loadedProject.description ?? ''}
                />
                <Button
                    label={'Save changes'}
                    icon={<SaveIcon/>}
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                />
            </Card>

        </Screen>
    )
}

export default ProjectDetailsSettingsDetailsScreen
