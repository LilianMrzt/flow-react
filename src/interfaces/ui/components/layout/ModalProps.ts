import { ReactNode } from 'react'

export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    label: string
    description: string
}
