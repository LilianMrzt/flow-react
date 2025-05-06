import { CSSProperties, ReactElement } from 'react'

export interface IconButtonProps {
    onClick: () => void
    children: ReactElement
    className?: string
    iconSize?: number
    backgroundColor?: CSSProperties['backgroundColor']
    color?: CSSProperties['color']
    hoverBackgroundColor?: CSSProperties['backgroundColor']
    hoverColor?: CSSProperties['color']
}
