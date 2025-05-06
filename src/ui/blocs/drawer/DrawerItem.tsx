import React, { FC, ReactNode, useState } from 'react'
import './drawer-item.css'
import Text from '@components/text/Text'
import Icon from '@components/resources/Icon'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { DrawerItemProps } from '@interfaces/ui/blocs/drawer/DrawerItemProps'

const DrawerItem: FC<DrawerItemProps> = ({
    route
}): ReactNode => {
    const { theme } = useTheme()

    const [isHovered, setIsHovered] = useState(false)

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
                backgroundColor: isHovered ? theme.tertiary : theme.surface
            }}
        >
            {route.icon && (
                <div
                    className={'drawer-item-icon'}
                >
                    <Icon>
                        {route.icon}
                    </Icon>
                </div>
            )}
            <Text>
                {route.label}
            </Text>
        </div>
    )
}

export default DrawerItem
