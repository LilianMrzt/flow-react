import React, { type FC } from 'react'
import './table.css'
import { type TableHeadProps } from '@interfaces/ui/components/tables/TableHeadProps'

const TableHead: FC<TableHeadProps> = ({
    children
}) => {
    return (
        <thead
            className={'table-head'}
        >
            {children}
        </thead>
    )
}

export default TableHead
