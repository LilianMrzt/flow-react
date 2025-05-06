import React, { FC } from 'react'
import './text.css'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { TextProps } from '@interfaces/ui/text/TextProps'

const Text: FC<TextProps> = ({
    children,
    fontSize,
    color,
    wrap,
    textAlign,
    width
}) => {
    const { theme } = useTheme()

    return (
        <p
            className={`text ${wrap ? 'wrap' : ''}`}
            style={{
                fontSize: fontSize ?? 14,
                color: color ?? theme.text,
                textAlign: textAlign ?? 'center',
                width: width ?? 'fit-content'
            }}
        >
            {children}
        </p>
    )
}

export default Text
