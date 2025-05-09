import React, { type FC } from 'react'
import { type TableBodyProps } from '@interfaces/ui/components/tables/TableBodyProps'
import './table.css'

export const TableBody: FC<TableBodyProps> = ({
    children
}) => {
    return (
        <tbody
            className={'table-body'}
        >
            {children}
        </tbody>
    )
}
