import React, { ReactNode, useState } from 'react'
import Screen from '@components/layout/Screen'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import TaskCreationModalContent from '@ui/blocs/modals/TaskCreationModalContent'
import Modal from '@components/layout/Modal'
import { AddIcon } from '@resources/Icons'

const ProjectDetailsBacklogScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    const [isTaskCreationModalOpen, setIsTaskCreationModalOpen] = useState(false)

    if (!loadedProject) return null

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
            {loadedProject.tasks.map((task) => {
                return (
                    <div
                        key={task?.id}
                    >
                        {task?.title}
                    </div>
                )
            })}
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
