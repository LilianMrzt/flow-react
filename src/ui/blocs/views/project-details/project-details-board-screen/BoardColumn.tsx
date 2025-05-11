import React, { FC, ReactNode, useState } from 'react'
import './board-column.css'
import Text from '@components/text/Text'
import { BoardColumnProps } from '@interfaces/ui/blocs/views/project-details/project-details-board-screen/BoardColumnProps'
import { useTasks } from '@hooks/contexts/api/TasksProvider'
import ColumnTask from '@ui/blocs/views/project-details/project-details-board-screen/ColumnTask'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { useBoardDragAndDrop } from '@hooks/hooks/useBoardDragAndDrop'

const BoardColumn: FC<BoardColumnProps> = ({ column }): ReactNode => {
    const { tasks } = useTasks()
    const { loadedProject } = useLoadedProject()
    const { showAlert } = useAlert()
    const { theme } = useTheme()

    const [isDragOver, setIsDragOver] = useState(false)
    const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null)
    const [hoveredPosition, setHoveredPosition] = useState<'top' | 'bottom' | null>(null)
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

    const {
        handleDrop,
        getColumnTasks,
        shouldShowLine
    } = useBoardDragAndDrop({
        projectSlug: loadedProject?.slug ?? '',
        columnId: column.id,
        tasks,
        hoveredTaskId,
        hoveredPosition,
        setHoveredTaskId,
        setHoveredPosition,
        setDraggedTaskId,
        showAlert,
        setIsDragOver
    })

    const columnTasks = getColumnTasks()

    return (
        <div
            className={'board-column'}
            style={{
                backgroundColor: isDragOver ? theme.secondary : theme.tertiary
            }}
        >
            <div
                className={'board-column-header'}
            >
                <Text>
                    {column.name}
                </Text>
                <Text>
                    {columnTasks.length.toString()}
                </Text>
            </div>

            <div
                className={'board-column-content'}
                onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragOver(true)
                }}
                onDragLeave={() => {
                    setIsDragOver(false)
                    setHoveredTaskId(null)
                    setHoveredPosition(null)
                }}
                onDrop={(e) => {
                    const taskId = e.dataTransfer.getData('text/plain')
                    handleDrop(taskId)
                }}
                style={{
                    border: isDragOver ? `2px dashed ${theme.hoverSecondary}` : `2px solid ${theme.tertiary}`
                }}
            >
                {columnTasks.map((task, index) => {
                    const previousTask = columnTasks[index - 1]
                    const showLine = shouldShowLine(task.id, previousTask?.id, draggedTaskId)

                    return (
                        <div
                            key={task.id}
                        >
                            <div
                                className={'board-column-insertion-line'}
                                style={{
                                    backgroundColor: showLine ? theme.primary : 'transparent'
                                }}
                            />
                            <ColumnTask
                                task={task}
                                onHoverPosition={(position) => {
                                    setHoveredTaskId(task.id)
                                    setHoveredPosition(position)
                                }}
                                setDraggedTaskId={setDraggedTaskId}
                            />
                        </div>
                    )
                })}

                <div
                    className={'board-column-insertion-line'}
                    style={{
                        backgroundColor:
                            hoveredTaskId === columnTasks.at(-1)?.id &&
                            hoveredPosition === 'bottom' &&
                            hoveredTaskId !== draggedTaskId
                                ? theme.primary
                                : 'transparent'
                    }}
                    onDragOver={(e) => {
                        e.preventDefault()
                        const last = columnTasks.at(-1)
                        if (last) {
                            setHoveredTaskId(last.id)
                            setHoveredPosition('bottom')
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default BoardColumn
