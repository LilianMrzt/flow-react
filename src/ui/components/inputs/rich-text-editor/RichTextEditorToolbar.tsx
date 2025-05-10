import React, { FC, useRef, useState } from 'react'
import './rich-text-editor-toolbar.css'
import RichTextEditorToolbarButton from '@components/inputs/rich-text-editor/RichTextEditorToolbarButton'
import { RichTextEditorToolbarProps } from '@interfaces/ui/components/inputs/rich-text-editor/RichTextEditorToolbarProps'
import { BaselineIcon, BoldIcon, ItalicIcon, UnderlineIcon } from '@resources/Icons'
import MenuWrapper from '@components/dropdowns/menu/MenuWrapper'
import IconButton from '@components/buttons/IconButton'
import RichTextEditorToolbarColorSelectionDropdown
    from '@components/inputs/rich-text-editor/toolbar/RichTextEditorToolbarColorSelectionDropdown'
import { useTheme } from '@hooks/contexts/ThemeContext'

const RichTextEditorToolbar: FC<RichTextEditorToolbarProps> = ({
    editor
}) => {
    if (!editor) return null

    const {
        theme
    } = useTheme()

    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const [isColorSelectionDropdownOpen, setIsColorSelectionDropdownOpen] = useState(false)

    return (
        <div
            className={'rich-text-editor-toolbar'}
        >
            <RichTextEditorToolbarButton
                onClick={() => {
                    return editor.chain().focus().toggleBold().run()
                }}
                isActive={editor.isActive('bold')}
                icon={<BoldIcon/>}
            />
            <RichTextEditorToolbarButton
                onClick={() => {
                    return editor.chain().focus().toggleItalic().run()
                }}
                isActive={editor.isActive('italic')}
                icon={<ItalicIcon/>}
            />
            <RichTextEditorToolbarButton
                onClick={() => {
                    return editor.chain().focus().toggleUnderline().run()
                }}
                isActive={editor.isActive('underline')}
                icon={<UnderlineIcon/>}
            />
            <MenuWrapper
                onClose={() => {
                    setIsColorSelectionDropdownOpen(false)
                }}
                anchorRef={wrapperRef}
            >
                <IconButton
                    iconSize={20}
                    onClick={() => {
                        setIsColorSelectionDropdownOpen(!isColorSelectionDropdownOpen)
                    }}
                    backgroundColor={isColorSelectionDropdownOpen ? theme.secondary : theme.surface}
                    hoverBackgroundColor={isColorSelectionDropdownOpen ? theme.hoverSecondary : theme.tertiary}
                    color={isColorSelectionDropdownOpen ? theme.primary : theme.text}
                >
                    <BaselineIcon/>
                </IconButton>
                <RichTextEditorToolbarColorSelectionDropdown
                    isColorSelectionDropdownOpen={isColorSelectionDropdownOpen}
                    anchorRef={wrapperRef}
                    editor={editor}
                />
            </MenuWrapper>
        </div>
    )
}

export default RichTextEditorToolbar
