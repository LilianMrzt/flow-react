import React, { FC, ReactNode, useRef } from 'react'
import Text from '@components/text/Text'
import { ColumnTaskProps } from '@interfaces/ui/blocs/views/app/project-details/project-details-board-screen/ColumnTaskProps'
import './column-task.css'
import { createDragImageFromElement } from '@utils/DragUtils'
import { useNavigate } from 'react-router-dom'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'

const ColumnTask: FC<ColumnTaskProps> = ({
    task,
    onHoverPosition,
    setDraggedTaskId,
    draggedTaskId
}): ReactNode => {
    const ref = useRef<HTMLDivElement | null>(null)

    const {
        loadedProject
    } = useLoadedProject()

    const navigate = useNavigate()

    if (!loadedProject) return

    return (
        <div
            ref={ref}
            className={'column-task '}
            draggable
            onClick={() => {
                navigate(ProjectsRoutes.projectDetailsBoardTaskModal.pathFn!({
                    key: loadedProject?.key,
                    taskId: task.key
                }))
            }}
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
