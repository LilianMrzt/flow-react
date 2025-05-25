import React, { type FC, Fragment, type ReactNode, useEffect, useState } from 'react'
import './task-modal.css'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@resources/Icons'
import { useTheme } from '@hooks/contexts/ThemeContext'
import IconButton from '@components/buttons/IconButton'
import { TaskModalProps } from '@interfaces/ui/components/layout/modals/TaskModalProps'
import Row from '@components/layout/Row'
import Column from '@components/layout/Column'
import TextField from '@components/inputs/TextField'
import { useFadeVisibility } from '@hooks/hooks/useFadeVisibility'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { useAlert } from '@hooks/contexts/AlertContext'
import { getTaskByKeyAction } from '@api/TasksApiCalls'
import { useSearchParams } from 'react-router-dom'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import Text from '@components/text/Text'
import RichTextEditor from '@components/inputs/rich-text-editor/RichTextEditor'

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

    const [searchParams] = useSearchParams()
    const selectedTaskKey = searchParams.get('selectedTask')

    const [selectedTask, setSelectedTask] = useState<TaskObject | null>(null)
    const [selectedTaskTitle, setSelectedTaskTitle] = useState('')
    const [selectedTaskDescription, setSelectedTaskDescription] = useState('')

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
                                    {selectedTask?.key ?? ''}
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
                                    <TextField
                                        inputValue={selectedTaskTitle}
                                        setInputValue={setSelectedTaskTitle}
                                        placeholder={selectedTask?.title ?? ''}
                                    />
                                    <RichTextEditor
                                        label={'Description'}
                                        inputValue={selectedTaskDescription}
                                        setInputValue={setSelectedTaskDescription}
                                    />
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
