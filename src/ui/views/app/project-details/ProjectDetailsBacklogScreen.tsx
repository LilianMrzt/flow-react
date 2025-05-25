import React, { ReactNode, useEffect, useState } from 'react'
import Screen from '@components/layout/screen/Screen'
import TaskCreationModalContent from '@ui/blocs/modals/TaskCreationModalContent'
import Modal from '@components/layout/Modal'
import { AddIcon } from '@resources/Icons'
import NoTaskSection from '@ui/blocs/views/project-details/project-details-backlog-screen/NoTaskSection'
import { useTasks } from '@hooks/contexts/api/TasksProvider'
import BacklogTable
    from '@ui/blocs/views/project-details/project-details-backlog-screen/backlog-table/BacklogTable'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { PROJECT_DETAILS_BREADCRUMBS } from '@constants/breadcrumbs/ProjectDetailsBreadcrumbs'
import { useBoardColumns } from '@hooks/contexts/api/BoardColumnsProvider'
import Skeleton from '@components/layout/Skeleton'

const ProjectDetailsBacklogScreen = (): ReactNode => {
    const [isTaskCreationModalOpen, setIsTaskCreationModalOpen] = useState(false)

    const {
        tasks
    } = useTasks()

    const {
        fetchColumns,
        hasFetchedOnceColumns
    } = useBoardColumns()

    const {
        fetchTasks,
        hasFetchedOnceTasks
    } = useTasks()

    const {
        loadedProject
    } = useLoadedProject()

    useEffect(() => {
        if (loadedProject) {
            void fetchColumns()
            void fetchTasks()
        }
    }, [loadedProject])

    if (!loadedProject) return null

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
            breadCrumbsRoutes={PROJECT_DETAILS_BREADCRUMBS(loadedProject)}
        >
            {hasFetchedOnceColumns && hasFetchedOnceTasks ? (
                <>
                    {tasks.length > 0 ? (
                        <BacklogTable/>
                    ) : (
                        <NoTaskSection
                            setIsTaskCreationModalOpen={setIsTaskCreationModalOpen}
                        />
                    )}
                </>
            ) : (
                <Skeleton
                    width={'100%'}
                    height={'70%'}
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
