import { type ReactNode } from 'react'
import { ButtonProps } from '@interfaces/ui/components/buttons/ButtonProps'

export interface ScreenProps {
    children: ReactNode
    label: string
    description: string
    buttonContent?: ButtonProps
}
