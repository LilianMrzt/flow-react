import React, { FC, ReactNode, useState } from 'react'
import Card from '@components/layout/Card'
import Text from '@components/text/Text'
import './project-card.css'
import { useNavigate } from 'react-router-dom'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { ProjectCardProps } from '@interfaces/ui/blocs/views/projects-screen/ProjectCardProps'
import SubTitle from '@components/text/SubTitle'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Column from '@components/layout/Column'
import Separator from '@components/layout/Separator'
import Icon from '@components/resources/Icon'
import { TaskIcon } from '@resources/Icons'
import Row from '@components/layout/Row'
import { getUpdatedLabel } from '@utils/dateUtils.ts'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'

const ProjectCard: FC<ProjectCardProps> = ({
    project
}): ReactNode => {
    const navigate = useNavigate()
    const { theme } = useTheme()
    const { setActiveProjectKey } = useProjects()

    const [isHovered, setIsHovered] = useState(false)

    /**
     * Gère l'événement de survol de la souris
     */
    const handleMouseEnter = (): void => {
        setIsHovered(true)
    }

    /**
     * Gère la fin du survol de la souris
     */
    const handleMouseLeave = (): void => {
        setIsHovered(false)
    }

    return (
        <Card
            className={'project-card'}
            onClick={() => {
                navigate(ProjectsRoutes.projectDetails.pathFn!({ key: project.key }))
                setActiveProjectKey(project.key)
            }}
            width={'100%'}
            padding={0}
            gap={0}
            hoverShadow
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Column
                alignItems={'start'}
                className={'project-card-content'}
                gap={16}
            >
                <Column
                    alignItems={'start'}
                >
                    <SubTitle
                        fontSize={20}
                        color={isHovered ? theme.primary : theme.text}
                    >
                        {project.name}
                    </SubTitle>
                    <div
                        className={'project-card-description'}
                    >
                        <Text
                            color={theme.textSecondary}
                            fontSize={14}
                            wrap
                            textAlign={'start'}
                            maxLines={2}
                        >
                            {project.description}
                        </Text>
                    </div>
                </Column>
                <Row
                    justifyContent={'flex-start'}
                    width={'fit-content'}
                >
                    <Icon
                        size={16}
                        color={theme.textSecondary}
                    >
                        <TaskIcon/>
                    </Icon>
                    <Text
                        color={theme.textSecondary}
                        fontSize={14}
                        textAlign={'start'}
                    >
                        18 tasks
                    </Text>
                </Row>
            </Column>
            <Separator/>
            <Row
                className={'project-card-footer'}
                justifyContent={'space-between'}
            >
                <div/>
                <Text
                    color={theme.textSecondary}
                    fontSize={12}
                    textAlign={'start'}
                >
                    {getUpdatedLabel(project.updatedAt)}
                </Text>
            </Row>
        </Card>
    )
}

export default ProjectCard
