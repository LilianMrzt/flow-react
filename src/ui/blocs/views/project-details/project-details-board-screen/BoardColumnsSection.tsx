import React, { ReactNode, useState } from 'react'
import './board-column-section.css'
import BoardColumn from '@ui/blocs/views/project-details/project-details-board-screen/BoardColumn'
import { useBoardColumns } from '@hooks/contexts/api/BoardColumnsProvider'

const BoardColumnsSection = (): ReactNode => {
    const {
        columns
    } = useBoardColumns()

    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

    return (
        <div
            className={'board-column-section'}
        >
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
        </div>
    )
}

export default BoardColumnsSection
