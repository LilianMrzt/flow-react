import React, { FC, ReactNode, useState } from 'react'
import TextField from '@components/inputs/TextField'
import Column from '@components/layout/Column'
import Row from '@components/layout/Row'
import Button from '@components/buttons/Button'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { useAlert } from '@hooks/contexts/AlertContext'
import { createTaskAction } from '@api/TasksApiCalls'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import Select from '@components/dropdowns/select/Select'
import {
    TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS
} from '@constants/select-options/TaskCreationModalPrioritySelectOptions'
import { TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS } from '@constants/select-options/TaskCreationModalTypeSelectOptions'
import { TaskCreationModalContentProps } from '@interfaces/ui/blocs/modals/TaskCreationModalContentProps'
import {
    TASK_CREATION_MODAL_COLUMN_SELECT_OPTIONS
} from '@constants/select-options/TaskCreationModalColumnSelectOptions'
import {
    TASK_CREATION_MODAL_ASSIGNEE_SELECT_OPTIONS
} from '@constants/select-options/TaskCreationModalAssignedUserSelectOptions'
import RichTextEditor from '@components/inputs/rich-text-editor/RichTextEditor'

const TaskCreationModalContent: FC<TaskCreationModalContentProps> = ({
    setIsOpen
}): ReactNode => {
    const {
        theme
    } = useTheme()

    const {
        showAlert
    } = useAlert()

    const {
        loadedProject
    } = useLoadedProject()

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskPriority, setTaskPriority] = useState(TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS[2].value)
    const [taskType, setTaskType] = useState(TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS[0].value)
    const [taskColumnId, setTaskColumnId] = useState(TASK_CREATION_MODAL_COLUMN_SELECT_OPTIONS(loadedProject)[0].value)
    const [taskAssignedUser, setTaskAssignedUser] = useState(TASK_CREATION_MODAL_ASSIGNEE_SELECT_OPTIONS(loadedProject)[0].value)

    /**
     * Gestion de la fermeture du Modal
     */
    const handleClose = (): void => {
        setIsOpen(false)
    }

    /**
     * Gestion du click sur le bouton de submit
     */
    const handleSubmit = async (): Promise<void> => {
        if (!loadedProject) return

        if (!taskTitle) {
            showAlert('All fields need to be filled to create the task', 'warning')
            return
        }

        await createTaskAction(loadedProject?.key, {
            title: taskTitle,
            description: taskDescription,
            type: taskType,
            priority: taskPriority,
            columnId: taskColumnId === 'none' ? undefined : taskColumnId,
            assignedUser: taskAssignedUser === 'none' ? undefined : taskAssignedUser
        }).then(() => {
            showAlert('Task successfully created.' , 'success')
            handleClose()
        }).catch((error) => {
            showAlert(error.message , 'error')
        })
    }

    return (
        <Column
            alignItems={'flex-start'}
            gap={16}
        >
            <TextField
                label={'Title'}
                inputValue={taskTitle}
                setInputValue={setTaskTitle}
                placeholder={'Task title'}
            />
            <RichTextEditor
                inputValue={taskDescription}
                setInputValue={setTaskDescription}
                label={'Description'}
                placeholder={'Task description'}
            />
            <Row
                gap={16}
            >
                <Select
                    label={'Type'}
                    value={taskType}
                    onChange={setTaskType}
                    options={TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS}
                />
                <Select
                    label={'Priority'}
                    value={taskPriority}
                    onChange={setTaskPriority}
                    options={TASK_CREATION_MODAL_PRIORITY_SELECT_OPTIONS}
                />
            </Row>
            <Row gap={16}>
                <Select
                    label={'Status'}
                    value={taskColumnId}
                    onChange={setTaskColumnId}
                    options={TASK_CREATION_MODAL_COLUMN_SELECT_OPTIONS(loadedProject)}
                />
                <Select
                    label={'Assigned to'}
                    value={taskAssignedUser}
                    onChange={setTaskAssignedUser}
                    options={TASK_CREATION_MODAL_ASSIGNEE_SELECT_OPTIONS(loadedProject)}
                />
            </Row>

            <Row
                justifyContent={'flex-end'}
            >
                <Button
                    label={'Cancel'}
                    onClick={handleClose}
                    backgroundColor={theme.surface}
                    hoverBackgroundColor={theme.secondary}
                    borderColor={theme.outline}
                    color={theme.text}
                    hoverColor={theme.primary}
                />
                <Button
                    label={'Create task'}
                    onClick={handleSubmit}
                />
            </Row>
        </Column>
    )
}

export default TaskCreationModalContent
