import React, { type FC } from 'react'
import './table.css'
import { type TableRowProps } from '@interfaces/ui/components/tables/TableRowProps'

export const TableRow: FC<TableRowProps> = ({
    children,
    isHeader = false,
    className,
    height,
    backgroundColor,
    onClick,
    onMouseLeave,
    onMouseEnter
}) => {
    return (
        <tr
            className={`${isHeader ? 'header-row' : 'table-row'} ${className ? className : ''}`}
            style={{
                height: height ?? 'fit-content',
                backgroundColor: backgroundColor ?? 'transparent'
            }}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </tr>
    )
}
