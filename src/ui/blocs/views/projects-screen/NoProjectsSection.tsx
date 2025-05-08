import React, { FC, ReactNode } from 'react'
import Column from '@components/layout/Column'
import Text from '@components/text/Text'
import Button from '@components/buttons/Button'
import { AddIcon, FileTextIcon } from '@resources/Icons'
import Icon from '@components/resources/Icon'
import { useTheme } from '@hooks/contexts/ThemeContext'
import './no-projects-section.css'
import { NoProjectsSectionProps } from '@interfaces/ui/blocs/views/projects-screen/NoProjectsSectionProps'

const NoProjectsSection: FC<NoProjectsSectionProps> = ({
    setIsProjectCreationModalOpen
}): ReactNode => {
    const {
        theme
    } = useTheme()

    return (
        <Column
            gap={16}
            className={'no-projects-section'}
        >
            <Icon
                color={theme.textSecondary}
                backgroundColor={theme.tertiary}
                padding={20}
                size={40}
                borderRadius={'50%'}
            >
                <FileTextIcon/>
            </Icon>
            <Text>
                No projects.
            </Text>
            <Text
                color={theme.textSecondary}
                wrap
            >
                {'You haven\'t created a project yet. Start by creating your first project to organize your tasks.'}
            </Text>
            <Button
                label={'New project'}
                icon={<AddIcon/>}
                onClick={() => {
                    setIsProjectCreationModalOpen(true)
                }}
            />
        </Column>
    )
}

export default NoProjectsSection
