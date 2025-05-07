import React, { FC, ReactNode } from 'react'
import Card from '@components/layout/Card'
import Text from '@components/text/Text'
import './project-card.css'
import { useNavigate } from 'react-router-dom'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { ProjectCardProps } from '@interfaces/ui/blocs/views/projects-screen/ProjectCardProps'

const ProjectCard: FC<ProjectCardProps> = ({
    project
}): ReactNode => {
    const navigate = useNavigate()

    return (
        <Card>
            <div
                className={'project-card'}
                onClick={() => {
                    navigate(ProjectsRoutes.projectDetails.pathFn!({ slug: project.slug }))
                }}
            >
                <Text>
                    {project.name}
                </Text>
            </div>
        </Card>
    )
}

export default ProjectCard
