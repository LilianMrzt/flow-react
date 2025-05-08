import React, { type FC, useState } from 'react'
import { MenuItemProps } from '@interfaces/ui/components/dropdowns/menu/MenuItemProps'
import './menu-item.css'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Text from '@components/text/Text'
import Icon from '@components/resources/Icon'

const MenuItem: FC<MenuItemProps> = ({
    onClick,
    onClose,
    label,
    icon,
    color
}) => {
    const {
        theme
    } = useTheme()

    const [isHovered, setIsHovered] = useState(false)

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
        <div
            className={'menu-item'}
            style={{
                backgroundColor: isHovered ? theme.secondary : theme.surface
            }}
            onClick={() => {
                onClick()
                onClose()
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {icon && (
                <Icon
                    size={16}
                    color={isHovered ? theme.primary : componentColor}
                >
                    {icon}
                </Icon>
            )}
            <Text
                color={isHovered ? theme.primary : componentColor}
                fontSize={14}
                isSelectable={false}
            >
                {label}
            </Text>
        </div>
    )
}

export default MenuItem
