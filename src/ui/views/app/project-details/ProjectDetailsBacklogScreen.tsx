import React, { ReactNode, useState } from 'react'
import Screen from '@components/layout/Screen'
import TaskCreationModalContent from '@ui/blocs/modals/TaskCreationModalContent'
import Modal from '@components/layout/Modal'
import { AddIcon } from '@resources/Icons'
import NoTaskSection from '@ui/blocs/views/project-details/project-details-backlog-screen/NoTaskSection'
import { useTasks } from '@hooks/contexts/api/TasksProvider'
import BacklogTable
    from '@ui/blocs/views/project-details/project-details-backlog-screen/backlog-table/BacklogTable'

const ProjectDetailsBacklogScreen = (): ReactNode => {
    const [isTaskCreationModalOpen, setIsTaskCreationModalOpen] = useState(false)

    const {
        tasks
    } = useTasks()

    return (
        <Screen
            label={'Project Backlog'}
            description={'Backlog'}
            buttonContent={{
                label: 'New Task',
                icon: <AddIcon/>,
                onClick: () => {
                    setIsTaskCreationModalOpen(true)
                }
            }}
        >
            {tasks.length > 0 ? (
                <BacklogTable/>
            ) : (
                <NoTaskSection
                    setIsTaskCreationModalOpen={setIsTaskCreationModalOpen}
                />
            )}
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
