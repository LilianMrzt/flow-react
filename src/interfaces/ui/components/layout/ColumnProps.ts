import { type CSSProperties, type ReactNode } from 'react'

export interface ColumnProps {
    children: ReactNode
    className?: string
    alignItems?: CSSProperties['alignItems']
    justifyContent?: CSSProperties['justifyContent']
    gap?: CSSProperties['gap']
    width?: CSSProperties['width']
    height?: CSSProperties['height']
}
