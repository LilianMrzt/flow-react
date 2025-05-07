import { type CSSProperties, type ReactNode } from 'react'

export interface CardProps {
    children: ReactNode
    gap?: CSSProperties['gap']
    justifyContent?: CSSProperties['justifyContent']
    height?: CSSProperties['height']
    width?: CSSProperties['width']
    alignItems?: CSSProperties['alignItems']
    className?: string
}
