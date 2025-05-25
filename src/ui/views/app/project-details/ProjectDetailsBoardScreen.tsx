import React, { ReactNode, useEffect, useState } from 'react'
import Screen from '@components/layout/screen/Screen'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import './project-details-screen.css'
import BoardColumnsSection from '@ui/blocs/views/project-details/project-details-board-screen/BoardColumnsSection'
import { AddIcon } from '@resources/Icons'
import Modal from '@components/layout/modals/Modal'
import TaskCreationModalContent from '@ui/blocs/modals/TaskCreationModalContent'
import { PROJECT_DETAILS_BREADCRUMBS } from '@constants/breadcrumbs/ProjectDetailsBreadcrumbs'
import { useSearchParams } from 'react-router-dom'
import TaskModal from '@components/layout/modals/TaskModal'
import { useBoardColumns } from '@hooks/contexts/api/BoardColumnsProvider'

const ProjectDetailsBoardScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    const {
        fetchColumns
    } = useBoardColumns()

    useEffect(() => {
        if (loadedProject) {
            void fetchColumns()
        }
    }, [loadedProject])

    const [isTaskCreationModalOpen, setIsTaskCreationModalOpen] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()

    const selectedTaskKey = searchParams.get('selectedTask')

    const closeTaskModal = (): void => {
        searchParams.delete('selectedTask')
        setSearchParams(searchParams, { replace: true })
    }

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
            <TaskModal
                isOpen={!!selectedTaskKey}
                onClose={closeTaskModal}
            />
        </Screen>
    )
}

export default ProjectDetailsBoardScreen
