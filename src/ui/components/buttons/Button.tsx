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
    color,
    hoverColor,
    borderColor,
    backgroundColor,
    hoverBackgroundColor,
    width
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
            onClick={onClick}
            className={'button'}
            style={{
                backgroundColor: isHovered ? hoverBackgroundColor ?? theme.hoverPrimary : componentBackgroundColor,
                borderColor: borderColor ?? theme.primary,
                width: width ?? 'fit-content'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {icon && (
                <Icon
                    color={isHovered && hoverColor ? hoverColor : componentColor}
                    size={18}
                >
                    {icon}
                </Icon>
            )}
            <Text
                color={isHovered && hoverColor ? hoverColor : componentColor}
                fontSize={14}
                isSelectable={false}
            >
                {label}
            </Text>
        </button>
    )
}

export default Button
