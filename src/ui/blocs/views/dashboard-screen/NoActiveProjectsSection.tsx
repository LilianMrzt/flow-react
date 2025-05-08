import React, { ReactNode } from 'react'
import Text from '@components/text/Text'
import Button from '@components/buttons/Button'
import { AddIcon } from '@resources/Icons'
import { useNavigate } from 'react-router-dom'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import Column from '@components/layout/Column'
import './no-active-projects-section.css'
import { useTheme } from '@hooks/contexts/ThemeContext'

const NoActiveProjectsSection = (): ReactNode => {
    const navigate = useNavigate()

    const {
        theme
    } = useTheme()

    return (
        <Column
            className={'no-active-projects-section'}
            height={'fit-content'}
            gap={16}
        >
            <Text
                color={theme.textSecondary}
            >
                No active projects at the moment.
            </Text>
            <Button
                label={'Create a project'}
                icon={<AddIcon/>}
                onClick={() => {
                    navigate(ProjectsRoutes.projects.path)
                }}
            />
        </Column>
    )
}

export default NoActiveProjectsSection
