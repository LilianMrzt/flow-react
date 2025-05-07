import React, { FC, ReactNode, useState } from 'react'
import './textfield.css'
import Text from '@components/text/Text'
import { TextFieldProps } from '@interfaces/ui/components/inputs/TextFieldProps'
import { useTheme } from '@hooks/contexts/ThemeContext'

const TextField: FC<TextFieldProps> = ({
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
     * Gère l'événement de focus du textField
     */
    const handleFocus = (): void => {
        setIsActive(true)
    }

    /**
     * Gère l'événement de blur du textField
     */
    const handleBlur = (): void => {
        setIsActive(false)
    }

    return (
        <div
            className={'text-field-wrapper'}
        >
            <Text>
                {label}
            </Text>
            <input
                className={'text-field'}
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

export default TextField
