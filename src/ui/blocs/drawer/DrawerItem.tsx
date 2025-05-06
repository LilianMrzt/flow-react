import React, { FC, ReactNode, useState } from 'react'
import './drawer-item.css'
import Text from '@components/text/Text'
import Icon from '@components/resources/Icon'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { DrawerItemProps } from '@interfaces/ui/blocs/drawer/DrawerItemProps'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'

const DrawerItem: FC<DrawerItemProps> = ({
    route
}): ReactNode => {
    const location = useLocation()
    const navigate = useNavigate()
    const { theme } = useTheme()

    const [isHovered, setIsHovered] = useState(false)

    const isSelected = route.path === location.pathname
    const componentBackgroundColor = isSelected ? theme.secondary : (isHovered ? theme.tertiary : theme.surface)
    const componentColor = isSelected ? theme.primary : theme.text
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
            className={'drawer-item'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                backgroundColor: componentBackgroundColor
            }}
            onClick={() => {
                navigate(route.path)
            }}
        >
            {route.icon && (
                <div
                    className={'drawer-item-icon'}
                >
                    <Icon
                        color={componentColor}
                    >
                        {route.icon}
                    </Icon>
                </div>
            )}
            <Text
                color={componentColor}
            >
                {route.label}
            </Text>
        </div>
    )
}

export default DrawerItem
