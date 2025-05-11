import React, { FC, ReactNode, useState } from 'react'
import './board-column.css'
import Text from '@components/text/Text'
import { BoardColumnProps } from '@interfaces/ui/blocs/views/project-details/project-details-board-screen/BoardColumnProps'
import { useTasks } from '@hooks/contexts/api/TasksProvider'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import ColumnTask from '@ui/blocs/views/project-details/project-details-board-screen/ColumnTask'
import { updateTaskAction } from '@api/TasksApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { useTheme } from '@hooks/contexts/ThemeContext'

const BoardColumn: FC<BoardColumnProps> = ({ column }): ReactNode => {
    const { tasks } = useTasks()
    const { loadedProject } = useLoadedProject()
    const { showAlert } = useAlert()
    const { theme } = useTheme()

    const [isDragOver, setIsDragOver] = useState(false)
    const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null)
    const [hoveredPosition, setHoveredPosition] = useState<'top' | 'bottom' | null>(null)
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

    const handleDrop = async (taskId: string): Promise<void> => {
        const task = tasks.find(t => {
            return t.id === taskId
        })
        if (!loadedProject || column.id === task?.column?.id) return

        await updateTaskAction(loadedProject.slug, taskId, { columnId: column.id }).catch((error) => {
            showAlert(error.message, 'error')
        })
    }

    const columnTasks = tasks
        .filter((task: TaskObject) => {
            return task.column?.id === column.id
        })
        .sort((a, b) => {
            return (a.orderInColumn ?? 0) - (b.orderInColumn ?? 0)
        })

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
                    void handleDrop(taskId)
                    setIsDragOver(false)
                    setHoveredTaskId(null)
                    setHoveredPosition(null)
                    setDraggedTaskId(null)
                }}
                style={{
                    border: isDragOver ? `2px dashed ${theme.hoverSecondary}` : `2px solid ${theme.tertiary}`
                }}
            >
                {columnTasks.map((task, index) => {
                    const isSelfHover = hoveredTaskId === draggedTaskId
                    const showLine =
                        !isSelfHover &&
                        ((hoveredTaskId === task.id && hoveredPosition === 'top') ||
                            (hoveredTaskId === columnTasks[index - 1]?.id && hoveredPosition === 'bottom'))

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
                            hoveredTaskId === columnTasks.at(-1)?.id && hoveredPosition === 'bottom'
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
