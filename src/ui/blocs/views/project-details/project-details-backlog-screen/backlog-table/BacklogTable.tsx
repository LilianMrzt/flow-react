import React, { ReactNode, useState } from 'react'
import './backlog-table.css'
import BacklogTableHeader
    from '@ui/blocs/views/project-details/project-details-backlog-screen/backlog-table/BacklogTableHeader'
import { useTasks } from '@hooks/contexts/api/TasksProvider'
import BacklogTask
    from '@ui/blocs/views/project-details/project-details-backlog-screen/backlog-table/BacklogTask'

const BacklogTable = (): ReactNode => {
    const {
        tasks
    } = useTasks()

    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

    const sortedBacklogTasks = tasks
        .sort((a, b) => {
            return (a.orderInBacklog ?? 0) - (b.orderInBacklog ?? 0)
        })

    return (
        <div
            className={'backlog-table'}
        >
            <BacklogTableHeader/>
            {sortedBacklogTasks.map((task) => {
                return (
                    <BacklogTask
                        key={task.id}
                        task={task}
                        sortedBacklogTasks={sortedBacklogTasks}
                        draggedTaskId={draggedTaskId}
                        setDraggedTaskId={setDraggedTaskId}
                    />
                )
            })}
        </div>
    )
}

export default BacklogTable
