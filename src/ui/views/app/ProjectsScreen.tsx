import React, { ReactNode, useEffect, useState } from 'react'
import Screen from '@components/layout/Screen'
import { AddIcon } from '@resources/Icons'
import Modal from '@components/layout/Modal'
import ProjectCreationModalContent from '@ui/blocs/modals/ProjectCreationModalContent'
import { getUserProjectsAction } from '@api/ProjectsApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useProject } from '@hooks/contexts/api/ProjectsContext'
import ProjectCard from '@ui/blocs/views/projects-screen/ProjectCard'

const ProjectsScreen = (): ReactNode => {
    const [isProjectCreationModalOpen, setIsProjectCreationModalOpen] = useState(false)

    const {
        showAlert
    } = useAlert()

    const {
        projects,
        getProjectsStateUpdate
    } = useProject()

    useEffect(() => {
        const fetchProjects = async (): Promise<void> => {
            await getUserProjectsAction()
                .then((res) => {
                    getProjectsStateUpdate(res)
                }).catch((error) => {
                    showAlert(error.message , 'error')
                })
        }

        void fetchProjects()
    }, [])

    return (
        <Screen
            label={'Projects'}
            description={'Access, manage and organize your projects'}
            buttonContent={{
                label: 'New project',
                icon: <AddIcon/>,
                onClick: () => {
                    setIsProjectCreationModalOpen(true)
                }
            }}
        >
            {projects.length > 0 && projects.map((project) => {
                return (
                    <ProjectCard
                        key={project.slug}
                        project={project}
                    />
                )
            })}
            <Modal
                isOpen={isProjectCreationModalOpen}
                onClose={() => {
                    setIsProjectCreationModalOpen(false)
                }}
                label={'Create a new project'}
                description={'Fill in the details to create a new project.'}
            >
                <ProjectCreationModalContent
                    setIsOpen={setIsProjectCreationModalOpen}
                />
            </Modal>
        </Screen>
    )
}

export default ProjectsScreen
