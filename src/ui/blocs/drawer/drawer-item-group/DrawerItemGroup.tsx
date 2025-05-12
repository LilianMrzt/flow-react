import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'
import Icon from '@components/resources/Icon'
import Text from '@components/text/Text'
import './drawer-item-group.css'
import '../drawer-item.css'
import DrawerSubItem from '@ui/blocs/drawer/drawer-item-group/DrawerSubItem'
import { DrawerItemGroupProps } from '@interfaces/ui/blocs/drawer/drawer-item-group/DrawerItemGroupProps'

const DrawerItemGroup: FC<DrawerItemGroupProps> = ({
    parentRoute,
    childrenRoutes,
    isProjectDetails,
    isDrawerOpen
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
    const [isExpanded, setIsExpanded] = useState(() => {
        return childrenRoutes.some(route => {
            const path = isProjectDetails && activeProjectSlug ? route.pathFn!({ slug: activeProjectSlug }) : route.path
            return location.pathname === path
        })
    })

    const resolvedParentPath = isProjectDetails && activeProjectSlug
        ? parentRoute.pathFn!({ slug: activeProjectSlug })
        : parentRoute.path

    const isSelected = location.pathname.startsWith(resolvedParentPath)

    useEffect(() => {
        if (!isSelected) {
            setIsExpanded(false)
        } else {
            setIsExpanded(true)
        }
    }, [isSelected])

    const backgroundColor = isSelected ? theme.secondary : (isHovered ? theme.tertiary : theme.surface)
    const textColor = isSelected ? theme.primary : theme.text

    return (
        <div
            className={'drawer-item-group'}
        >
            <div
                className={'drawer-item'}
                onMouseEnter={() => {
                    setIsHovered(true)
                }}
                onMouseLeave={() => {
                    setIsHovered(false)
                }}
                style={{
                    backgroundColor
                }}
                onClick={() => {
                    setIsExpanded(true)
                    navigate(
                        isProjectDetails && activeProjectSlug
                            ? childrenRoutes[0].pathFn!({ slug: activeProjectSlug })
                            : childrenRoutes[0].path
                    )

                }}
            >
                {parentRoute.icon && (
                    <div
                        className={'drawer-item-icon'}
                    >
                        <Icon
                            color={textColor}
                        >
                            {parentRoute.icon}
                        </Icon>
                    </div>
                )}
                <Text
                    color={textColor}
                    isSelectable={false}
                >
                    {parentRoute.label}
                </Text>
            </div>
            {isExpanded && (
                <div
                    className={'drawer-sub-items-group'}
                    style={{
                        paddingLeft: isDrawerOpen ? 20 : 0
                    }}
                >
                    {childrenRoutes.map(route => {
                        return (
                            <DrawerSubItem
                                key={route.path}
                                isProjectDetails={isProjectDetails}
                                route={route}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default DrawerItemGroup
