import React, { ReactNode, useState } from 'react'
import Screen from '@components/layout/screen/Screen'
import Text from '@components/text/Text'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { PROJECT_DETAILS_SETTINGS_BREADCRUMBS } from '@constants/breadcrumbs/ProjectDetailsSettingsBreadcrumbs'
import Card from '@components/layout/Card'
import Column from '@components/layout/Column'
import Button from '@components/buttons/Button'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { TrashIcon, WarningIcon } from '@resources/Icons'
import Row from '@components/layout/Row'
import Icon from '@components/resources/Icon'
import SubTitle from '@components/text/SubTitle'
import Modal from '@components/layout/Modal'
import ConfirmProjectDeletionModalContent from '@ui/blocs/modals/ConfirmProjectDeletionModalContent'

const ProjectDetailsSettingsDangerZoneScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    const {
        theme
    } = useTheme()

    const [isProjectDeletionModalOpen, setIsProjectDeletionModalOpen] = useState(false)

    if (!loadedProject) return null

    return (
        <Screen
            label={'Project settings - Danger zone'}
            description={'Destructive actions that cannot be undone'}
            breadCrumbsRoutes={PROJECT_DETAILS_SETTINGS_BREADCRUMBS(loadedProject)}
        >
            <Card
                alignItems={'start'}
                width={'100%'}
            >
                <Column
                    alignItems={'start'}
                >
                    <Row
                        width={'fit-content'}
                    >
                        <Icon
                            color={theme.error}
                        >
                            <WarningIcon/>
                        </Icon>
                        <SubTitle
                            color={theme.error}
                        >
                            Warning
                        </SubTitle>
                    </Row>
                    <Text>
                        The following actions are irreversible and cannot be undone. Please be careful.
                    </Text>
                </Column>
                <Column
                    border={'1px solid var(--error'}
                    padding={16}
                    alignItems={'start'}
                >
                    <Text
                        fontSize={18}
                        fontWeight={600}
                        color={theme.error}
                    >
                        Delete project
                    </Text>
                    <Text
                        fontSize={14}
                        color={theme.textSecondary}
                    >
                        Deleting the project will also remove all associated tasks and cannot be undone.
                    </Text>
                    <Button
                        label={'Delete project'}
                        onClick={() => {
                            setIsProjectDeletionModalOpen(true)
                        }}
                        backgroundColor={theme.error}
                        hoverBackgroundColor={theme.hoverError}
                        borderColor={theme.error}
                        fontWeight={600}
                        icon={<TrashIcon/>}
                    />
                </Column>
            </Card>
            <Modal
                isOpen={isProjectDeletionModalOpen}
                onClose={() => {
                    setIsProjectDeletionModalOpen(false)
                }}
                label={'Confirm deletion'}
                icon={<TrashIcon/>}
                iconColor={theme.error}
                titleColor={theme.error}
            >
                <ConfirmProjectDeletionModalContent
                    setIsOpen={setIsProjectDeletionModalOpen}
                />
            </Modal>
        </Screen>
    )
}

export default ProjectDetailsSettingsDangerZoneScreen
