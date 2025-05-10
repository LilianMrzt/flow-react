import { RefObject } from 'react'
import { Editor } from '@tiptap/react'

export interface RichTextEditorToolbarColorSelectionDropdownProps {
    isColorSelectionDropdownOpen: boolean
    anchorRef: RefObject<HTMLDivElement | null>
    editor: Editor
}
