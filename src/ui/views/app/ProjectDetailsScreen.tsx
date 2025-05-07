import React, { ReactNode, useEffect, useState } from 'react'
import Screen from '@components/layout/Screen'
import { getProjectBySlugAction } from '@api/ProjectsApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useParams } from 'react-router'
import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'
import Text from '@components/text/Text'

const ProjectDetailsScreen = (): ReactNode => {
    const [project, setProject] = useState<ProjectObject | null>(null)

    const {
        showAlert
    } = useAlert()

    const { slug } = useParams<{ slug: string }>()

    useEffect(() => {
        const fetchProject = async (): Promise<void> => {
            if (!slug) return

            await getProjectBySlugAction(slug)
                .then((res) => {
                    setProject(res)
                })
                .catch((error) => {
                    showAlert(error.message , 'error')
                })
        }

        void fetchProject()
    }, [])

    if (!project) return null

    return (
        <Screen
            label={'Project Details'}
            description={'Project details and tasks'}
        >
            <Text>
                {project.name}
            </Text>
            <Text>
                {project.description}
            </Text>
        </Screen>
    )
}

export default ProjectDetailsScreen
