import { CSSProperties, ReactElement, ReactNode } from 'react'

export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    label: string
    description?: string
    icon?: ReactElement
    iconColor?: CSSProperties['color']
}
