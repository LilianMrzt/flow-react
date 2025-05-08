import React, { FC, ReactNode, useState } from 'react'
import './drawer-item.css'
import Text from '@components/text/Text'
import Icon from '@components/resources/Icon'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { DrawerItemProps } from '@interfaces/ui/blocs/drawer/DrawerItemProps'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'

const DrawerItem: FC<DrawerItemProps> = ({
    route,
    isProjectDetails = false
}): ReactNode => {
    const location = useLocation()
    const navigate = useNavigate()
    const {
        theme
    } = useTheme()

    const {
        activeProjectSlug
    } = useProjects()

    const [isHovered, setIsHovered] = useState(false)

    const path = isProjectDetails && activeProjectSlug ? route.pathFn!({ slug: activeProjectSlug }) : route.path

    const isSelected = path === location.pathname
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
                navigate(path)
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
                isSelectable={false}
            >
                {route.label}
            </Text>
        </div>
    )
}

export default DrawerItem
