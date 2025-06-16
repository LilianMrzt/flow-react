import React, { ReactNode, useState } from 'react'
import './backlog-table.css'
import BacklogTableHeader from '@ui/blocs/views/app/project-details/project-details-backlog-screen/backlog-table/BacklogTableHeader'
import { useTasks } from '@hooks/contexts/api/TasksProvider'
import BacklogTask from '@ui/blocs/views/app/project-details/project-details-backlog-screen/backlog-table/BacklogTask'
import { useTheme } from '@hooks/contexts/ThemeContext'

const BacklogTable = (): ReactNode => {
    const {
        tasks
    } = useTasks()
    const {
        theme
    } = useTheme()

    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)
    const [hoveredLineId, setHoveredLineId] = useState<string | null>(null)
    const [hoveredLinePosition, setHoveredLinePosition] = useState<'top' | 'bottom' | null>(null)

    const sortedBacklogTasks = tasks.sort((a, b) => {
        return (a.orderInBacklog ?? 0) - (b.orderInBacklog ?? 0)
    })

    return (
        <div
            className={'backlog-table'}
        >
            <BacklogTableHeader />
            {sortedBacklogTasks.map((task, index) => {
                const previousTaskId = sortedBacklogTasks[index - 1]?.id
                const isHoveredTop = hoveredLineId === task.id && hoveredLinePosition === 'top'
                const isHoveredBottom = hoveredLineId === previousTaskId && hoveredLinePosition === 'bottom'

                const showLine =
                    (isHoveredTop && draggedTaskId !== task.id) ||
                    (isHoveredBottom && draggedTaskId !== previousTaskId)

                return (
                    <div
                        key={task.id}
                    >
                        <div
                            className={'insertion-line'}
                            style={{
                                backgroundColor: showLine ? theme.primary : theme.tertiary
                            }}
                            onDragOver={(e) => {
                                e.preventDefault()
                            }}
                        />
                        <BacklogTask
                            task={task}
                            sortedBacklogTasks={sortedBacklogTasks}
                            draggedTaskId={draggedTaskId}
                            setDraggedTaskId={setDraggedTaskId}
                            setHoveredLineId={setHoveredLineId}
                            hoveredLinePosition={hoveredLinePosition}
                            setHoveredLinePosition={setHoveredLinePosition}
                        />
                    </div>
                )
            })}
            <div
                className={'insertion-line'}
                style={{
                    backgroundColor:
                        hoveredLineId === sortedBacklogTasks.at(-1)?.id &&
                        hoveredLinePosition === 'bottom' &&
                        draggedTaskId !== sortedBacklogTasks.at(-1)?.id
                            ? theme.primary
                            : theme.surface
                }}
                onDragOver={(e) => {
                    return e.preventDefault()
                }}
            />
        </div>
    )
}

export default BacklogTable
