import React, { FC, ReactNode } from 'react'
import './backlog-table-cell.css'
import {
    BackTableCellProps
} from '@interfaces/ui/blocs/views/app/project-details/project-details-backlog-screen/backlog-table/BackTableCellProps'

const BackTableCell: FC<BackTableCellProps> = ({
    width,
    children,
    justifyContent,
    draggedTaskId
}): ReactNode => {
    return (
        <div
            className={`backlog-table-cell ${draggedTaskId !== null ? 'disable-drag-pointer-events' : ''}`}
            style={{
                width,
                justifyContent: justifyContent ?? 'start'
            }}
            draggable={false}
        >
            {children}
        </div>
    )
}

export default BackTableCell
