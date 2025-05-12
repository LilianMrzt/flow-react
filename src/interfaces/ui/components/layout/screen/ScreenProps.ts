import { type ReactNode } from 'react'
import { ButtonProps } from '@interfaces/ui/components/buttons/ButtonProps'
import { BreadCrumbItemObject } from '@interfaces/objects/front/BreadCrumbItemObject'

export interface ScreenProps {
    children: ReactNode
    label: string
    description: string
    buttonContent?: ButtonProps
    className?: string
    breadCrumbsRoutes?: BreadCrumbItemObject[]
}
