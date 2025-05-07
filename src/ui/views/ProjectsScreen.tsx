import React, { ReactNode, useState } from 'react'
import Screen from '@components/layout/Screen'
import { AddIcon } from '@resources/Icons'
import Modal from '@components/layout/Modal'
import ProjectCreationModalContent from '@ui/blocs/modals/ProjectCreationModalContent'

const ProjectsScreen = (): ReactNode => {
    const [isProjectCreationModalOpen, setIsProjectCreationModalOpen] = useState(false)

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
            ProjectsScreen
            <Modal
                isOpen={isProjectCreationModalOpen}
                setIsOpen={setIsProjectCreationModalOpen}
                onClose={() => {
                    setIsProjectCreationModalOpen(false)
                }}
                label={'Create a new project'}
                description={'Fill in the details to create a new project.'}
                buttonContent={{
                    label: 'Create project',
                    onClick: () => {}
                }}
            >
                <ProjectCreationModalContent/>
            </Modal>
        </Screen>
    )
}

export default ProjectsScreen
