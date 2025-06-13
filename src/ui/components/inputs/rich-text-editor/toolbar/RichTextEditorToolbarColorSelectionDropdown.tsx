import React, { FC, ReactNode } from 'react'
import MenuGroup from '@components/dropdowns/menu/MenuGroup'
import MenuDropdown from '@components/dropdowns/menu/MenuDropdown'
import {
    RichTextEditorToolbarColorSelectionDropdownProps
} from '@interfaces/ui/components/inputs/rich-text-editor/toolbar/RichTextEditorToolbarColorSelectionDropdownProps'
import './rich-text-editor-toolbar-color-selection-dropdown.css'
import { RICH_TEXT_EDITOR_COLORS } from '@constants/themes/RichTextEditorColors'

const RichTextEditorToolbarColorSelectionDropdown: FC<RichTextEditorToolbarColorSelectionDropdownProps> = ({
    anchorRef,
    dropdownRef,
    isColorSelectionDropdownOpen,
    setIsColorSelectionDropdownOpen,
    editor
}): ReactNode => {

    return(
        <MenuDropdown
            anchorRef={anchorRef}
            dropdownRef={dropdownRef}
            isOpen={isColorSelectionDropdownOpen}
        >
            <MenuGroup
                padding={6}
            >
                <div
                    className={'rich-text-editor-toolbar-color-selection-dropdown'}
                >
                    {RICH_TEXT_EDITOR_COLORS.map((color) => {
                        return (
                            <button
                                key={color}
                                className={'rich-text-editor-toolbar-color-selection-dropdown-swatch'}
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                    setIsColorSelectionDropdownOpen(false)
                                    editor.chain().focus().setColor(color).run()
                                }}
                                title={color}
                            />
                        )
                    })}
                </div>
            </MenuGroup>
        </MenuDropdown>
    )
}

export default RichTextEditorToolbarColorSelectionDropdown
