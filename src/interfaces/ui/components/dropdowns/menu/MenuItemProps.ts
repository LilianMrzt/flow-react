import type { CSSProperties, ReactElement } from 'react'

export interface MenuItemProps {
    onClick: () => void
    onClose: () => void
    label: string
    icon?: ReactElement
    color?: CSSProperties['color']
    iconColor?: CSSProperties['color']
}
