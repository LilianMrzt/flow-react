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

const ProjectDetailsSettingsDetailsScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    const {
        theme
    } = useTheme()

    if (!loadedProject) return null

    const [newProjectName, setNewProjectName] = useState(loadedProject.name)
    const [newProjectKey, setNewProjectKey] = useState(loadedProject.key)
    const [newProjectDescription, setNewProjectDescription] = useState(loadedProject.description ?? '')

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
                    placeholder={'Project name'}
                />
                <TextField
                    inputValue={newProjectKey}
                    setInputValue={setNewProjectKey}
                    label={'Project key'}
                    placeholder={'Project key'}
                />
                <TextArea
                    inputValue={newProjectDescription}
                    setInputValue={setNewProjectDescription}
                    label={'Project description'}
                    placeholder={'Project description'}
                />
                <Button
                    label={'Save changes'}
                    icon={<SaveIcon/>}
                    onClick={() => {}}
                />
            </Card>

        </Screen>
    )
}

export default ProjectDetailsSettingsDetailsScreen
