import React, { FC, ReactNode, useRef } from 'react'
import Text from '@components/text/Text'
import { ColumnTaskProps } from '@interfaces/ui/blocs/views/project-details/project-details-board-screen/ColumnTaskProps'
import './column-task.css'
import { createDragImageFromElement } from '@utils/DragUtils'

const ColumnTask: FC<ColumnTaskProps> = ({
    task,
    onHoverPosition,
    setDraggedTaskId,
    draggedTaskId
}): ReactNode => {
    const ref = useRef<HTMLDivElement | null>(null)

    return (
        <div
            ref={ref}
            className={'column-task '}
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', task.id)
                setDraggedTaskId(task.id)
                if (ref.current) createDragImageFromElement(e, ref.current)
            }}
            onDragOver={(e) => {
                e.preventDefault()
                const rect = e.currentTarget.getBoundingClientRect()
                const isTop = e.clientY <= rect.top + rect.height / 2
                onHoverPosition(isTop ? 'top' : 'bottom')
            }}
        >
            <div
                className={`column-task-content ${draggedTaskId !== null && draggedTaskId !== task.id ? 'disable-drag-pointer-events' : ''}`}
            >
                <Text
                    isSelectable={false}
                    maxLines={2}
                >
                    {task.title}
                </Text>
            </div>
        </div>
    )
}

export default ColumnTask
