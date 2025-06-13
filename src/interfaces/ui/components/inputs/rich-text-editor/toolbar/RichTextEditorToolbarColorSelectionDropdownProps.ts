import { Dispatch, RefObject, SetStateAction } from 'react'
import { Editor } from '@tiptap/react'

export interface RichTextEditorToolbarColorSelectionDropdownProps {
    isColorSelectionDropdownOpen: boolean
    setIsColorSelectionDropdownOpen: Dispatch<SetStateAction<boolean>>
    anchorRef: RefObject<HTMLDivElement | null>
    dropdownRef: RefObject<HTMLDivElement | null>
    editor: Editor
}
