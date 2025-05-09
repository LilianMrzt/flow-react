import React, { ReactNode, useState } from 'react'
import Screen from '@components/layout/Screen'
import TaskCreationModalContent from '@ui/blocs/modals/TaskCreationModalContent'
import Modal from '@components/layout/Modal'
import { AddIcon } from '@resources/Icons'
import BacklogTable from '@ui/blocs/views/project-details/project-details-backlog-screen/BacklogTable'

const ProjectDetailsBacklogScreen = (): ReactNode => {

    const [isTaskCreationModalOpen, setIsTaskCreationModalOpen] = useState(false)

    return (
        <Screen
            label={'Project Backlog'}
            description={'Backlog'}
            buttonContent={{
                label: 'Add Task',
                icon: <AddIcon/>,
                onClick: () => {
                    setIsTaskCreationModalOpen(true)
                }
            }}
        >
            <BacklogTable/>
            <Modal
                isOpen={isTaskCreationModalOpen}
                onClose={() => {
                    setIsTaskCreationModalOpen(false)
                }}
                label={'Create a new task'}
                description={'Fill in the details to create a new task.'}
            >
                <TaskCreationModalContent
                    setIsOpen={setIsTaskCreationModalOpen}
                />
            </Modal>
        </Screen>
    )
}

export default ProjectDetailsBacklogScreen
