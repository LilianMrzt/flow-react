import React, { type FC } from 'react'
import './table.css'
import { TableProps } from '@interfaces/ui/components/tables/TableProps'

const Table: FC<TableProps> = ({
    children
}) => {
    return (
        <div
            className={'table-container'}
        >
            <table
                className={'table'}
            >
                {children}
            </table>
        </div>
    )
}

export default Table
