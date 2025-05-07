import React, { FC, ReactNode, useState } from 'react'
import './text-area.css'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { TextAreaProps } from '@interfaces/ui/components/inputs/TextAreaProps'

const TextArea: FC<TextAreaProps> = ({
    inputValue,
    setInputValue,
    label,
    placeholder
}): ReactNode => {
    const {
        theme
    } = useTheme()
    const [isActive, setIsActive] = useState(false)

    /**
     * Gère l'événement de focus du textArea
     */
    const handleFocus = (): void => {
        setIsActive(true)
    }

    /**
     * Gère l'événement de blur du textArea
     */
    const handleBlur = (): void => {
        setIsActive(false)
    }

    return (
        <div
            className={'text-area-wrapper'}
        >
            <Text>
                {label}
            </Text>
            <textarea
                className={'text-area'}
                value={inputValue}
                placeholder={placeholder}
                onChange={(e) => {
                    setInputValue(e.target.value)
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{
                    borderColor: isActive ? theme.primary : theme.outline
                }}
            />
        </div>
    )
}

export default TextArea
