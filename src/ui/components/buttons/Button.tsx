import React, { FC } from 'react'
import Text from '@components/text/Text'
import './button.css'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { ButtonProps } from '@interfaces/ui/components/buttons/ButtonProps'

const Button: FC<ButtonProps> = ({
    onClick,
    label,
    borderColor,
    backgroundColor
}) => {
    const { theme } = useTheme()

    return (
        <button
            onClick={onClick}
            className={'button'}
            style={{
                backgroundColor: backgroundColor ?? theme.primary,
                borderColor: borderColor ?? theme.surface
            }}
        >
            <Text>
                {label}
            </Text>
        </button>
    )
}

export default Button
