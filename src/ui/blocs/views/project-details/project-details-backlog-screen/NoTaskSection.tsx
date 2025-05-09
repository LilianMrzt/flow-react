import React, { FC, ReactNode } from 'react'
import Icon from '@components/resources/Icon'
import { AddIcon, TaskIcon } from '@resources/Icons'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Card from '@components/layout/Card'
import Column from '@components/layout/Column'
import './no-task-section.css'
import Text from '@components/text/Text'
import Button from '@components/buttons/Button'
import {
    NoTaskSectionProps
} from '@interfaces/ui/blocs/views/project-details/project-details-backlog-screen/NoTaskSectionProps'

const NoTaskSection: FC<NoTaskSectionProps> = ({
    setIsTaskCreationModalOpen
}): ReactNode => {
    const {
        theme
    } = useTheme()

    return (
        <Column
            className={'no-task-section'}
        >
            <Card
                gap={16}
                width={'100%'}
            >
                <Icon
                    color={theme.textSecondary}
                    backgroundColor={theme.tertiary}
                    padding={20}
                    size={40}
                    borderRadius={'50%'}
                >
                    <TaskIcon/>
                </Icon>
                <Text>
                    No Task found.
                </Text>
                <Text
                    color={theme.textSecondary}
                    wrap
                >
                    There are no tasks for this project yet. Start by creating your first task.
                </Text>
                <Button
                    label={'New Task'}
                    icon={<AddIcon/>}
                    onClick={() => {
                        setIsTaskCreationModalOpen(true)
                    }}
                />
            </Card>
        </Column>
    )
}

export default NoTaskSection
