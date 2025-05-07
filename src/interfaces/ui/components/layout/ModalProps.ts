import { Dispatch, ReactNode, SetStateAction } from 'react'
import { ButtonProps } from '@interfaces/ui/components/buttons/ButtonProps'

export interface ModalProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    onClose: () => void
    children: ReactNode
    label: string
    description: string
    buttonContent: ButtonProps
}
