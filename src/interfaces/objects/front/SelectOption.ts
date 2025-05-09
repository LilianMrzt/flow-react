import { CSSProperties, ReactElement } from 'react'

export interface SelectOption {
    label: string
    value: string
    icon?: ReactElement
    iconColor?: CSSProperties['color']
}
