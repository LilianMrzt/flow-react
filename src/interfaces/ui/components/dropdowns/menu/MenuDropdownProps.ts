import { ReactNode, RefObject } from 'react'

export interface MenuDropdownProps {
    children: ReactNode
    isOpen: boolean
    position?: 'left' | 'right'
    anchorRef: RefObject<HTMLDivElement | null>
    dropdownRef: RefObject<HTMLDivElement | null>
    buttonRef?: RefObject<HTMLDivElement | null>
    isSubMenu?: boolean
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}
