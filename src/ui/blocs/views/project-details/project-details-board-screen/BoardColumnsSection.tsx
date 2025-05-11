import React, { ReactNode, useState } from 'react'
import './board-column-section.css'
import BoardColumn from '@ui/blocs/views/project-details/project-details-board-screen/BoardColumn'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'

const BoardColumnsSection = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

    return (
        <div
            className={'board-column-section'}
        >
            {loadedProject?.columns.map((column) => {
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
