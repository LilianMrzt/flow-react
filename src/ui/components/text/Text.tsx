import React, { FC } from 'react'
import './text.css'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { TextProps } from '@interfaces/ui/components/text/TextProps'

const Text: FC<TextProps> = ({
    children,
    fontSize,
    fontWeight,
    color,
    textAlign,
    width,
    isSelectable = true,
    noWrap,
    maxLines
}) => {
    const { theme } = useTheme()

    return (
        <p
            className={`text ${isSelectable ? 'is-selectable' : ''}`}
            style={{
                fontSize: fontSize ?? 16,
                fontWeight: fontWeight ?? 'normal',
                color: color ?? theme.text,
                textAlign: textAlign ?? 'start',
                width: width ?? 'fit-content',
                whiteSpace: noWrap ? 'nowrap' : 'normal',
                overflow: noWrap || maxLines ? 'hidden' : undefined,
                textOverflow: noWrap ? 'ellipsis' : undefined,
                display: maxLines ? '-webkit-box' : undefined,
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: maxLines ? 'vertical' : undefined
            }}
        >
            {children}
        </p>
    )
}

export default Text
