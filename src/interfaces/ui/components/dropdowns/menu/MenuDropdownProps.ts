import type { ReactNode } from 'react'

export interface MenuDropdownProps {
    children: ReactNode
    isOpen: boolean
    position?: 'left' | 'right'
}
