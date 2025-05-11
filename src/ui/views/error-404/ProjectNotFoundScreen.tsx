import React, { ReactNode } from 'react'
import Column from '@components/layout/Column'
import SubTitle from '@components/text/SubTitle'
import Text from '@components/text/Text'
import Button from '@components/buttons/Button'
import { useNavigate } from 'react-router-dom'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'

const ProjectNotFoundScreen = (): ReactNode => {
    const navigate = useNavigate()

    return (
        <Column
            gap={24}
        >
            <SubTitle>
            Project not found
            </SubTitle>
            <Text>
                You have tried to access a project that does not exist or to which you are not authorized.
            </Text>
            <Button
                label={'Go to projects'}
                onClick={() => {
                    navigate(ProjectsRoutes.projects.path)
                }}
            />
        </Column>
    )
}

export default ProjectNotFoundScreen
