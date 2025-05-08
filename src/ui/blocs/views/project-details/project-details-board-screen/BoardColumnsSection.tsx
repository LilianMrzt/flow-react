import React, { ReactNode } from 'react'
import './board-column-section.css'
import BoardColumn from '@ui/blocs/views/project-details/project-details-board-screen/BoardColumn'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'

const BoardColumnsSection = (): ReactNode => {
    const {
        loadedProject
    } = useLoadedProject()

    return (
        <div
            className={'board-column-section'}
        >
            {loadedProject?.columns.map((column) => {
                return (
                    <BoardColumn
                        key={column.id}
                        column={column}
                    />
                )
            })}
        </div>
    )
}

export default BoardColumnsSection
