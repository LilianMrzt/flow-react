import React, { FC } from 'react'
import Text from '@components/text/Text'
import './button.css'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { ButtonProps } from '@interfaces/ui/components/buttons/ButtonProps'
import Icon from '@components/resources/Icon'

const Button: FC<ButtonProps> = ({
    onClick,
    label,
    icon,
    color,
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
                borderColor: borderColor ?? theme.primary
            }}
        >
            {icon && (
                <Icon
                    color={color ?? theme.surface}
                    size={18}
                >
                    {icon}
                </Icon>
            )}
            <Text
                color={color ?? theme.surface}
                fontSize={14}
            >
                {label}
            </Text>
        </button>
    )
}

export default Button
