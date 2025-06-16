import React, { type FC, Fragment, type ReactNode, useEffect, useState } from 'react'
import './task-modal.css'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@resources/Icons'
import { useTheme } from '@hooks/contexts/ThemeContext'
import IconButton from '@components/buttons/IconButton'
import { TaskModalProps } from '@interfaces/ui/blocs/views/app/project-details/task-modal/TaskModalProps'
import Row from '@components/layout/Row'
import Column from '@components/layout/Column'
import TextField from '@components/inputs/TextField'
import { useFadeVisibility } from '@hooks/hooks/useFadeVisibility'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { useAlert } from '@hooks/contexts/AlertContext'
import { getTaskByKeyAction, updateTaskAction } from '@api/TasksApiCalls'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import Text from '@components/text/Text'
import RichTextEditor from '@components/inputs/rich-text-editor/RichTextEditor'
import { TaskModalEditFieldButtonRow } from '@ui/blocs/views/app/project-details/task-modal/TaskModalEditFieldButtonRow'
import Skeleton from '@components/layout/Skeleton'
import { useSelectedTaskFromUrl } from '@hooks/hooks/useSelectedTaskFromUrl'

const TaskModal: FC<TaskModalProps> = ({
    isOpen,
    onClose
}): ReactNode => {
    const {
        theme
    } = useTheme()

    const {
        loadedProject
    } = useLoadedProject()

    const {
        showAlert
    } = useAlert()

    const {
        isVisible,
        isFadingIn
    } = useFadeVisibility(isOpen)

    const { selectedTaskKey } = useSelectedTaskFromUrl()

    const [selectedTask, setSelectedTask] = useState<TaskObject | null>(null)
    const [hasFetchedOnceSelectedTask, setHasFetchedOnceSelectedTask] = useState(false)

    const [selectedTaskTitle, setSelectedTaskTitle] = useState('')
    const [selectedTaskDescription, setSelectedTaskDescription] = useState('')

    const handleTaskUpdate = (
        fieldsToUpdate: {
            title?: string
            description?: string
        }
    ): void => {
        if (!loadedProject || !selectedTask) return

        if (fieldsToUpdate.title !== undefined && fieldsToUpdate.title.trim() === '') {
            showAlert('Title cannot be empty.', 'warning')
            return
        }

        updateTaskAction(loadedProject.key, selectedTask.id, fieldsToUpdate)
            .then((updated) => {
                setSelectedTask(updated)
                if (fieldsToUpdate.title !== undefined) {
                    setSelectedTaskTitle(updated.title)
                }
                if (fieldsToUpdate.description !== undefined) {
                    setSelectedTaskDescription(updated.description)
                }
            })
            .catch((error) => {
                showAlert(error.message, 'error')
            })
    }

    useEffect(() => {
        if (!loadedProject) return
        if (!selectedTaskKey) return

        getTaskByKeyAction(loadedProject.key, selectedTaskKey)
            .then((res) => {
                setSelectedTask(res)
                setSelectedTaskTitle(res.title)
                setSelectedTaskDescription(res.description)
            })
            .catch((error) => {
                showAlert(error.message, 'error')
                onClose()
            })
            .finally(() => {
                setTimeout(() => {
                    setHasFetchedOnceSelectedTask(true)
                }, 800) // TODO: retirer le delay
            })
    }, [loadedProject, selectedTaskKey])

    return createPortal(
        <Fragment>
            {isVisible
                ? (
                    <div
                        className={`task-modal-background ${isFadingIn ? 'fade-in' : 'fade-out'}`}
                    >
                        <div
                            className={`task-modal-content ${isFadingIn && 'show'}`}
                        >
                            <Row
                                justifyContent={'space-between'}
                            >
                                <Text>
                                    {selectedTaskKey}
                                </Text>
                                <Row
                                    justifyContent={'end'}
                                    width={'fit-content'}
                                >
                                    <IconButton
                                        onClick={() => {
                                            onClose()
                                            setTimeout(() => {
                                                setSelectedTask(null)
                                                setSelectedTaskTitle('')
                                                setSelectedTaskDescription('')
                                                setHasFetchedOnceSelectedTask(false)
                                            }, 150)
                                        }}
                                        backgroundColor={theme.surface}
                                        hoverBackgroundColor={theme.secondary}
                                        hoverColor={theme.primary}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                </Row>
                            </Row>
                            <Row>
                                <Column>
                                    {hasFetchedOnceSelectedTask ? (
                                        <>
                                            <TextField
                                                inputValue={selectedTaskTitle}
                                                setInputValue={setSelectedTaskTitle}
                                                placeholder={selectedTask?.title ?? ''}
                                            />
                                            {selectedTask?.title !== selectedTaskTitle && (
                                                <TaskModalEditFieldButtonRow
                                                    onSaveButtonClick={() => {
                                                        void handleTaskUpdate({ title: selectedTaskTitle })
                                                    }}
                                                    onCancelButtonClick={() => {
                                                        setSelectedTaskTitle(selectedTask?.title ?? '')
                                                    }}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <Skeleton
                                            width={'100%'}
                                            height={40}
                                        />
                                    )}

                                    {hasFetchedOnceSelectedTask ? (
                                        <>
                                            <RichTextEditor
                                                label={'Description'}
                                                inputValue={selectedTaskDescription}
                                                setInputValue={setSelectedTaskDescription}
                                            />
                                            {selectedTask?.description !== selectedTaskDescription && (
                                                <TaskModalEditFieldButtonRow
                                                    onSaveButtonClick={() => {
                                                        void handleTaskUpdate({ description: selectedTaskDescription })
                                                    }}
                                                    onCancelButtonClick={() => {
                                                        setSelectedTaskDescription(selectedTask?.description ?? '')
                                                    }}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <Skeleton
                                            width={'100%'}
                                            height={220}
                                        />
                                    )}

                                </Column>
                            </Row>
                        </div>
                    </div>
                )
                : null}
        </Fragment>,
        document.body
    )
}

export default TaskModal
