import React, { ReactNode, useState } from 'react'
import Screen from '@components/layout/screen/Screen'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import './project-details-screen.css'
import BoardColumnsSection from '@ui/blocs/views/project-details/project-details-board-screen/BoardColumnsSection'
import { AddIcon } from '@resources/Icons'
import Modal from '@components/layout/Modal'
import TaskCreationModalContent from '@ui/blocs/modals/TaskCreationModalContent'
import { PROJECT_DETAILS_BREADCRUMBS } from '@constants/breadcrumbs/ProjectDetailsBreadcrumbs'

const ProjectDetailsBoardScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    const [isTaskCreationModalOpen, setIsTaskCreationModalOpen] = useState(false)

    if (!loadedProject) return null

    return (
        <Screen
            label={'Project Details'}
            description={'Project details and tasks'}
            className={'project-details-screen'}
            buttonContent={{
                label: 'Add Task',
                icon: <AddIcon/>,
                onClick: () => {
                    setIsTaskCreationModalOpen(true)
                }
            }}
            breadCrumbsRoutes={PROJECT_DETAILS_BREADCRUMBS(loadedProject)}
        >
            <BoardColumnsSection/>
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

export default ProjectDetailsBoardScreen
