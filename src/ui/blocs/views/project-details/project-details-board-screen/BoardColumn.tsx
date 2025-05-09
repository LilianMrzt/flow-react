import React, { FC, ReactNode } from 'react'
import './board-column.css'
import Text from '@components/text/Text'
import {
    BoardColumnProps
} from '@interfaces/ui/blocs/views/project-details/project-details-board-screen/BoardColumnProps'
import { useTasks } from '@hooks/contexts/api/TasksProvider'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import ColumnTask from '@ui/blocs/views/project-details/project-details-board-screen/ColumnTask'

const BoardColumn: FC<BoardColumnProps> = ({
    column
}): ReactNode => {
    const {
        tasks
    } = useTasks()

    const columnTasks = tasks.filter((task: TaskObject) => {
        return task.column?.id === column.id
    })

    return (
        <div
            className={'board-column'}
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
