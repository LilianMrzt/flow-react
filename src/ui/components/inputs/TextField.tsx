import React, { FC, ReactNode, useState } from 'react'
import './textfield.css'
import Text from '@components/text/Text'
import { TextFieldProps } from '@interfaces/ui/components/inputs/TextFieldProps'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Icon from '@components/resources/Icon'
import Row from '@components/layout/Row'

const TextField: FC<TextFieldProps> = ({
    inputValue,
    setInputValue,
    label,
    placeholder,
    mandatory,
    type,
    icon,
    name
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
            <Row
                width={'fit-content'}
                gap={4}
            >
                <Text>
                    {label}
                </Text>
                {mandatory && (
                    <Text
                        color={theme.error}
                    >
                        *
                    </Text>
                )}
            </Row>
            <div
                className={'text-field-container'}
            >
                {icon && (
                    <span
                        className="text-field-icon"
                    >
                        <Icon
                            size={20}
                            color={theme.outline}
                        >
                            {icon}
                        </Icon>
                    </span>
                )}
                <input
                    className={`text-field ${icon ? 'text-field-with-icon' : ''}`}
                    value={inputValue}
                    placeholder={placeholder}
                    type={type ?? 'text'}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                        borderColor: isActive ? theme.primary : theme.outline
                    }}
                    name={name}
                    autoComplete={name}
                />
            </div>
        </div>
    )
}

export default TextField
