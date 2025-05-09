import React, { FC, ReactNode } from 'react'
import Column from '@components/layout/Column'
import Text from '@components/text/Text'
import Button from '@components/buttons/Button'
import { AddIcon, FileTextIcon } from '@resources/Icons'
import Icon from '@components/resources/Icon'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { NoProjectsSectionProps } from '@interfaces/ui/blocs/views/projects-screen/NoProjectsSectionProps'
import Card from '@components/layout/Card'

const NoProjectsSection: FC<NoProjectsSectionProps> = ({
    setIsProjectCreationModalOpen
}): ReactNode => {
    const {
        theme
    } = useTheme()

    return (
        <Column>
            <Card
                gap={16}
                width={'100%'}
                height={'100%'}
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
            </Card>
        </Column>
    )
}

export default NoProjectsSection
