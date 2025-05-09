import { type CSSProperties, MouseEventHandler, type ReactNode } from 'react'

export interface TableRowProps {
    children: ReactNode
    isHeader?: boolean
    className?: string
    height?: CSSProperties['height']
    backgroundColor?: CSSProperties['backgroundColor']
    onClick?: MouseEventHandler<HTMLTableRowElement>;
    onMouseEnter?: MouseEventHandler<HTMLTableRowElement>;
    onMouseLeave?: MouseEventHandler<HTMLTableRowElement>;
}
