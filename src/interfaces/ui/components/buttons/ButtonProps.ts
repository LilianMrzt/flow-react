import { CSSProperties, ReactElement } from 'react'

export interface ButtonProps {
    onClick: () => void
    label: string
    icon?: ReactElement
    disabled?: boolean
    color?: CSSProperties['color']
    hoverColor?: CSSProperties['color']
    backgroundColor?: CSSProperties['backgroundColor']
    hoverBackgroundColor?: CSSProperties['backgroundColor']
    borderColor?: CSSProperties['borderColor']
    width?: CSSProperties['width']
    minHeight?: CSSProperties['minHeight']
    padding?: CSSProperties['padding']
    fontWeight?: CSSProperties['fontWeight']
    fontSize?: CSSProperties['fontSize']
}
