import React, { FC } from 'react'
import './rich-text-editor-toolbar-button.css'
import {
    RichTextEditorToolbarButtonProps
} from '@interfaces/ui/components/inputs/rich-text-editor/RichTextEditorToolbarButtonProps'
import Icon from '@components/resources/Icon'

const RichTextEditorToolbarButton: FC<RichTextEditorToolbarButtonProps> = ({
    onClick,
    isActive = false,
    icon
}) => {
    return (
        <button
            type={'button'}
            className={`rich-text-editor-toolbar-button ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            <Icon
                size={16}
            >
                {icon}
            </Icon>
        </button>
    )
}

export default RichTextEditorToolbarButton
