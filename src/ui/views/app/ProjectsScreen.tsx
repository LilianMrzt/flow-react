import React, { ReactNode, useEffect, useState } from 'react'
import Screen from '@components/layout/screen/Screen'
import { AddIcon } from '@resources/Icons'
import Modal from '@components/layout/Modal'
import ProjectCreationModalContent from '@ui/blocs/modals/ProjectCreationModalContent'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'
import ProjectCard from '@ui/blocs/views/app/projects-screen/ProjectCard'
import './projects-screen.css'
import NoProjectsSection from '@ui/blocs/views/app/projects-screen/NoProjectsSection'
import Skeleton from '@components/layout/Skeleton'

const ProjectsScreen = (): ReactNode => {
    const [isProjectCreationModalOpen, setIsProjectCreationModalOpen] = useState(false)
    const [limit] = useState(10)
    const [offset] = useState(0)

    const {
        projects,
        hasFetchedOnceProjectsScreen,
        fetchUserProjects
    } = useProjects()

    useEffect(() => {
        void fetchUserProjects(limit, offset)
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
            {!hasFetchedOnceProjectsScreen ? (
                <div
                    className={'projects-screen-projects-container'}
                >
                    {Array.from({ length: 4 }).map((_, i) => {
                        return (
                            <Skeleton
                                key={i}
                                width={'100%'}
                                height={193}
                            />
                        )
                    })}
                </div>
            ) : projects.length > 0 ? (
                <div
                    className={'projects-screen-projects-container'}
                >
                    {projects.map((project) => {
                        return (
                            <ProjectCard
                                key={project.key}
                                project={project}
                            />
                        )
                    })}
                </div>
            ) : (
                <NoProjectsSection
                    setIsProjectCreationModalOpen={setIsProjectCreationModalOpen}
                />
            )}
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
