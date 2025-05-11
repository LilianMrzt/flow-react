import React, { FC, ReactElement } from 'react'
import './backlog-task-drag-image.css'
import { getSelectionFieldColor, getSelectionFieldIcon } from '@utils/IconsUtils'
import { TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS } from '@constants/select-options/TaskCreationModalTypeSelectOptions'
import Icon from '@components/resources/Icon'
import { BacklogTaskDragImageProps } from '@interfaces/ui/blocs/drag-images/BacklogTaskDragImageProps'

const BacklogTaskDragImage: FC<BacklogTaskDragImageProps> = ({
    task,
    width,
    height
}) => {
    return (
        <div
            className={'backlog-task-drag-image'}
            style={{
                width,
                height
            }}
        >
            {getSelectionFieldIcon(task.type, TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS) && (
                <Icon
                    size={18}
                    color={getSelectionFieldColor(task.type, TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS)}
                >
                    {getSelectionFieldIcon(task.type, TASK_CREATION_MODAL_TYPE_SELECT_OPTIONS) as ReactElement}
                </Icon>
            )}
            <p
                className={'backlog-task-drag-image-title'}
            >
                {task.title}
            </p>
        </div>
    )
}

export default BacklogTaskDragImage
