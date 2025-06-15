import React, { FC, ReactNode, useState } from 'react'
import './textfield.css'
import Text from '@components/text/Text'
import { TextFieldProps } from '@interfaces/ui/components/inputs/TextFieldProps'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Icon from '@components/resources/Icon'
import Row from '@components/layout/Row'
import { EyeIcon, EyeOffIcon } from '@resources/Icons'
import IconButton from '@components/buttons/IconButton'

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
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === 'password'

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
            {label && (
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
            )}
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
                    type={isPassword && !showPassword ? 'password' : 'text'}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={{
                        borderColor: isActive ? theme.primary : theme.outline,
                        paddingRight: isPassword ? 38 : 12
                    }}
                    name={name}
                    autoComplete={name}
                />
                {isPassword && (
                    <div
                        className={'text-field-password-toggle'}
                    >
                        <IconButton
                            onClick={() => {
                                return setShowPassword(!showPassword)
                            }}
                            padding={4}
                            hoverBackgroundColor={theme.secondary}
                            backgroundColor={theme.surface}
                            hoverColor={theme.primary}
                            color={theme.textSecondary}
                            iconSize={20}
                        >
                            {showPassword ? (
                                <EyeIcon />
                            ) : (
                                <EyeOffIcon />
                            )}
                        </IconButton>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TextField
