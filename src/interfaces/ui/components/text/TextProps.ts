import { CSSProperties, ReactNode } from 'react'

export interface TextProps {
    children: ReactNode
    fontSize?: CSSProperties['fontSize']
    fontWeight?: CSSProperties['fontWeight']
    color?: CSSProperties['color']
    textAlign?: CSSProperties['textAlign']
    width?: CSSProperties['width']
    wrap?: boolean
    isSelectable?: boolean
    maxLines?: number
}
