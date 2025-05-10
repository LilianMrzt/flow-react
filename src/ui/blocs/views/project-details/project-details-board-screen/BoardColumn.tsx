import React, { FC, ReactNode, useState } from 'react'
import './board-column.css'
import Text from '@components/text/Text'
import {
    BoardColumnProps
} from '@interfaces/ui/blocs/views/project-details/project-details-board-screen/BoardColumnProps'
import { useTasks } from '@hooks/contexts/api/TasksProvider'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import ColumnTask from '@ui/blocs/views/project-details/project-details-board-screen/ColumnTask'
import { updateTaskAction } from '@api/TasksApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { useTheme } from '@hooks/contexts/ThemeContext'

const BoardColumn: FC<BoardColumnProps> = ({
    column
}): ReactNode => {
    const {
        tasks
    } = useTasks()

    const {
        loadedProject
    } = useLoadedProject()
    const {
        showAlert
    } = useAlert()

    const {
        theme
    } = useTheme()

    const [isDragOver, setIsDragOver] = useState(false)

    /**
     * Gestion du drop d'une tache en cours de drag sur une colonne
     * @param taskId
     */
    const handleDrop = async (taskId: string): Promise<void> => {
        const task = tasks.find(t => {
            return t.id === taskId
        })

        if (!loadedProject || column.id === task?.column?.id) return

        await updateTaskAction(loadedProject.slug, taskId, { columnId: column.id })
            .catch((error) => {
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
                }}
                onDrop={(e) => {
                    const taskId = e.dataTransfer.getData('text/plain')
                    void handleDrop(taskId)
                    setIsDragOver(false)
                }}
                style={{
                    border: isDragOver ? `2px dashed ${theme.hoverSecondary}` : `2px solid ${theme.tertiary}`
                }}
            >
                {columnTasks.map(task => {
                    return (
                        <ColumnTask
                            key={task.id}
                            task={task}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default BoardColumn
