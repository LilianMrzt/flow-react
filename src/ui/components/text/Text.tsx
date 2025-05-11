import React, { FC } from 'react'
import './text.css'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { TextProps } from '@interfaces/ui/components/text/TextProps'

const Text: FC<TextProps> = ({
    children,
    fontSize,
    fontWeight,
    color,
    wrap,
    textAlign,
    width,
    isSelectable = true,
    maxLines
}) => {
    const { theme } = useTheme()

    return (
        <p
            className={`text ${wrap ? 'wrap' : ''} ${isSelectable ? 'is-selectable' : ''}`}
            style={{
                fontSize: fontSize ?? 16,
                fontWeight: fontWeight ?? 'normal',
                color: color ?? theme.text,
                textAlign: textAlign ?? 'start',
                width: width ?? 'fit-content',
                textOverflow: !maxLines ? 'ellipsis' : undefined,
                display: maxLines ? '-webkit-box' : undefined,
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: maxLines ? 'vertical' : undefined,
                whiteSpace: maxLines ? 'normal' : 'nowrap'
            }}
        >
            {children}
        </p>
    )
}

export default Text
