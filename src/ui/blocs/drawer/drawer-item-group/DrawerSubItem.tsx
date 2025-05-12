import React, { FC, useState } from 'react'
import Icon from '@components/resources/Icon'
import Text from '@components/text/Text'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'
import { useLocation } from 'react-router'
import './drawer-sub-item.css'
import { DrawerSubItemProps } from '@interfaces/ui/blocs/drawer/drawer-item-group/DrawerSubItemProps'

const DrawerSubItem: FC<DrawerSubItemProps> = ({
    route,
    isProjectDetails
}) => {
    const navigate = useNavigate()
    const location = useLocation()

    const {
        theme
    } = useTheme()

    const {
        activeProjectSlug
    } = useProjects()

    const [isHovered, setIsHovered] = useState(false)

    const path = isProjectDetails && activeProjectSlug ? route.pathFn!({ slug: activeProjectSlug }) : route.path

    const isSelected = location.pathname === path
    const textColor = isSelected ? theme.primary : theme.text
    const backgroundColor = isSelected ? theme.secondary : (isHovered ? theme.tertiary : theme.surface)

    return (
        <div
            key={path}
            className={'drawer-sub-item'}
            style={{
                backgroundColor
            }}
            onClick={() => {
                navigate(path)
            }}
            onMouseEnter={() => {
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
        >
            {route.icon && (
                <div
                    className={'drawer-item-icon'}
                >
                    <Icon
                        size={20}
                        color={textColor}
                    >
                        {route.icon}
                    </Icon>
                </div>
            )}
            <Text
                fontSize={14}
                color={isSelected ? theme.primary : theme.text}
                isSelectable={false}
            >
                {route.label}
            </Text>
        </div>
    )
}

export default DrawerSubItem
