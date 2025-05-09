import { ReactNode, RefObject } from 'react'

export interface MenuWrapperProps {
    children: ReactNode
    onClose: () => void
    anchorRef: RefObject<HTMLDivElement | null>
}
