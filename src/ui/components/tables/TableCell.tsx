import React, { type FC } from 'react'
import './table.css'
import { type TableCellProps } from '@interfaces/ui/components/tables/TableCellProps'

export const TableCell: FC<TableCellProps> = ({
    children,
    isHeader = false
}) => {
    const Component = isHeader ? 'th' : 'td'
    return (
        <Component
            className={`table-cell ${isHeader ? 'table-cell-header' : ''}`}
        >
            {children}
        </Component>
    )
}
