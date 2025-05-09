import { RefObject } from 'react'

export interface AvatarDropdownProps {
    isOpen: boolean
    onClose: () => void
    anchorRef: RefObject<HTMLDivElement | null>
}
