import React, { ReactNode, useState } from 'react'
import './board-column-section.css'
import BoardColumn from '@ui/blocs/views/app/project-details/project-details-board-screen/BoardColumn'
import { useBoardColumns } from '@hooks/contexts/api/BoardColumnsProvider'
import Skeleton from '@components/layout/Skeleton'
import { useTasks } from '@hooks/contexts/api/TasksProvider'

const BoardColumnsSection = (): ReactNode => {
    const {
        columns,
        hasFetchedOnceColumns
    } = useBoardColumns()

    const {
        hasFetchedOnceTasks
    } = useTasks()

    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

    return (
        <div
            className={'board-column-section'}
        >
            {hasFetchedOnceColumns && hasFetchedOnceTasks ? (
                <>
                    {columns
                        .slice()
                        .sort((a, b) => {
                            return a.order - b.order
                        })
                        .map((column) => {
                            return (
                                <BoardColumn
                                    key={column.id}
                                    column={column}
                                    draggedTaskId={draggedTaskId}
                                    setDraggedTaskId={setDraggedTaskId}
                                />
                            )
                        })}
                </>
            ) : (
                <>
                    {Array.from({ length: 3 }).map((_, i) => {
                        return (
                            <Skeleton
                                key={i}
                                width={250}
                                height={'calc(100vh - 230px)'}
                            />
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default BoardColumnsSection
