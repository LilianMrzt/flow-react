import React, { FC, useState } from 'react'
import Icon from '@components/resources/Icon'
import './icon-button.css'
import { IconButtonProps } from '@interfaces/ui/components/buttons/IconButtonProps'
import { useTheme } from '@hooks/contexts/ThemeContext'

const IconButton: FC<IconButtonProps> = ({
    onClick,
    children,
    className,
    iconSize,
    backgroundColor,
    color,
    hoverBackgroundColor,
    hoverColor,
    padding,
    borderRadius
}) => {
    const { theme } = useTheme()

    const [isHovered, setIsHovered] = useState(false)

    const componentBackgroundColor = backgroundColor ?? theme.primary
    const componentColor = color ?? theme.text

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
            className={`icon-button ${className}`}
            style={{
                backgroundColor: isHovered && hoverBackgroundColor ? hoverBackgroundColor : componentBackgroundColor,
                padding: padding ?? 6,
                borderRadius: borderRadius ?? 4
            }}
            onClick={(event) => {
                event.stopPropagation()
                onClick()
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Icon
                color={isHovered && hoverColor ? hoverColor : componentColor}
                size={iconSize ?? 24}
            >
                {children}
            </Icon>
        </button>
    )
}

export default IconButton
