import { ReactElement } from 'react'

export interface RichTextEditorToolbarButtonProps {
    onClick: () => void
    isActive?: boolean
    icon: ReactElement
}
