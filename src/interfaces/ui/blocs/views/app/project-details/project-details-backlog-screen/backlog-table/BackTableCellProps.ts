import { CSSProperties, ReactNode } from 'react'

export interface BackTableCellProps {
    width: CSSProperties['width']
    justifyContent?: CSSProperties['justifyContent']
    children?: ReactNode
    draggedTaskId?: string | null
}
