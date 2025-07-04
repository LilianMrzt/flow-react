import React, { ReactNode, useEffect, useState } from 'react'
import Screen from '@components/layout/screen/Screen'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import './project-details-screen.css'
import BoardColumnsSection from '@ui/blocs/views/project-details/project-details-board-screen/BoardColumnsSection'
import { AddIcon } from '@resources/Icons'
import Modal from '@components/layout/Modal'
import TaskCreationModalContent from '@ui/blocs/modals/TaskCreationModalContent'
import { PROJECT_DETAILS_BREADCRUMBS } from '@constants/breadcrumbs/ProjectDetailsBreadcrumbs'
import TaskModal from '@ui/blocs/views/project-details/task-modal/TaskModal'
import { useBoardColumns } from '@hooks/contexts/api/BoardColumnsProvider'
import { useTasks } from '@hooks/contexts/api/TasksProvider'
import { useSelectedTaskFromUrl } from '@hooks/hooks/useSelectedTaskFromUrl'

const ProjectDetailsBoardScreen = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    const {
        fetchColumns,
        hasFetchedOnceColumns
    } = useBoardColumns()

    const {
        fetchTasks,
        hasFetchedOnceTasks
    } = useTasks()

    useEffect(() => {
        if (loadedProject) {
            void fetchColumns()
            void fetchTasks()
        }
    }, [loadedProject])

    const [isTaskCreationModalOpen, setIsTaskCreationModalOpen] = useState(false)

    const { selectedTaskKey, setSelectedTaskKey } = useSelectedTaskFromUrl()

    const closeTaskModal = (): void => {
        setSelectedTaskKey(null)
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
            {hasFetchedOnceColumns && hasFetchedOnceTasks && (
                <TaskModal
                    isOpen={!!selectedTaskKey}
                    onClose={closeTaskModal}
                />
            )}
        </Screen>
    )
}

export default ProjectDetailsBoardScreen
