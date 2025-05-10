import React, { FC } from 'react'
import './rich-text-editor-toolbar.css'
import RichTextEditorToolbarButton from '@components/inputs/rich-text-editor/RichTextEditorToolbarButton'
import { RichTextEditorToolbarProps } from '@interfaces/ui/components/inputs/rich-text-editor/RichTextEditorToolbarProps'
import { BoldIcon, ItalicIcon, UnderlineIcon } from '@resources/Icons'

const RichTextEditorToolbar: FC<RichTextEditorToolbarProps> = ({
    editor
}) => {
    if (!editor) return null

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
        </div>
    )
}

export default RichTextEditorToolbar
