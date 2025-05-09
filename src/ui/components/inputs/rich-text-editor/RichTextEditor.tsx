import React, { FC, ReactNode, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import './rich-text-editor.css'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { RichTextEditorProps } from '@interfaces/ui/components/inputs/rich-text-editor/RichTextEditorProps'

const RichTextEditor: FC<RichTextEditorProps> = ({
    inputValue,
    setInputValue,
    placeholder,
    label
} ): ReactNode => {
    const {
        theme
    } = useTheme()

    const editor = useEditor({
        extensions: [StarterKit],
        content: inputValue || '',
        onUpdate: ({ editor }) => {
            setInputValue(editor.getHTML())
        }
    })

    useEffect(() => {
        if (editor && inputValue !== editor.getHTML()) {
            editor.commands.setContent(inputValue)
        }
    }, [inputValue])

    return (
        <div
            className={'rich-text-editor-wrapper'}
        >
            {label && (
                <Text>
                    {label}
                </Text>
            )}
            <div
                className={'rich-text-editor-container'}
                onClick={() => {
                    return editor?.commands.focus()
                }}
            >
                <EditorContent
                    editor={editor}
                />
                {editor?.isEmpty &&
                    <div
                        className={'rich-text-editor-placeholder'}
                    >
                        <Text
                            color={theme.outline}
                        >
                            {placeholder}
                        </Text>
                    </div>
                }
            </div>
        </div>
    )
}

export default RichTextEditor
