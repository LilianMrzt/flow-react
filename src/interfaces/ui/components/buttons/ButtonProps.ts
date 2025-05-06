import { CSSProperties, ReactElement } from 'react'

export interface ButtonProps {
    onClick: () => void
    label: string
    icon?: ReactElement
    color?: CSSProperties['color']
    backgroundColor?: CSSProperties['backgroundColor']
    borderColor?: CSSProperties['borderColor']
}
