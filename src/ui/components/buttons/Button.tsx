import React, { FC, useState } from 'react'
import Text from '@components/text/Text'
import './button.css'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { ButtonProps } from '@interfaces/ui/components/buttons/ButtonProps'
import Icon from '@components/resources/Icon'

const Button: FC<ButtonProps> = ({
    onClick,
    label,
    icon,
    disabled,
    color,
    hoverColor,
    borderColor,
    backgroundColor,
    hoverBackgroundColor,
    width,
    minHeight,
    padding,
    fontWeight,
    fontSize
}) => {
    const { theme } = useTheme()

    const [isHovered, setIsHovered] = useState(false)

    const componentBackgroundColor = backgroundColor ?? theme.primary
    const componentColor = color ?? theme.surface

    /**
     * Gère l'événement de survol de la souris
     */
    const handleMouseEnter = (): void => {
        setIsHovered(true)
    }

    /**
     * Gère la fin du survol de la souris
     */
    const handleMouseLeave = (): void => {
        setIsHovered(false)
    }

    return (
        <button
            onClick={() => {
                if (!disabled) {
                    onClick()
                }
            }}
            className={'button'}
            style={{
                backgroundColor: disabled ? theme.hoverSecondary : isHovered ? hoverBackgroundColor ?? theme.hoverPrimary : componentBackgroundColor,
                borderColor: disabled ? theme.hoverSecondary : borderColor ?? theme.primary,
                width: width ?? 'fit-content',
                padding: padding ?? '8px 16px',
                cursor: disabled ? 'default' : 'pointer',
                minHeight: minHeight ?? 40
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}
        >
            {icon && (
                <Icon
                    color={isHovered && !disabled && hoverColor ? hoverColor : componentColor}
                    size={16}
                >
                    {icon}
                </Icon>
            )}
            <Text
                color={isHovered && !disabled && hoverColor ? hoverColor : componentColor}
                fontSize={fontSize ?? 16}
                isSelectable={false}
                fontWeight={fontWeight}
            >
                {label}
            </Text>
        </button>
    )
}

export default Button
