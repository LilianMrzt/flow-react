import { type CSSProperties, type ReactNode } from 'react'

export interface CardProps {
    children: ReactNode
    className?: string
    width?: CSSProperties['width']
    padding?: CSSProperties['padding']
    gap?: CSSProperties['gap']
    onClick?: () => void
    hoverShadow?: boolean
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}
