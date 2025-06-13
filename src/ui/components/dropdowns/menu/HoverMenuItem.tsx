import React, { FC, ReactNode, useRef, useState } from 'react'
import './menu-item.css'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Icon from '@components/resources/Icon'
import { ChevronRightIcon } from '@resources/Icons'
import MenuDropdown from '@components/dropdowns/menu/MenuDropdown'
import MenuItem from '@components/dropdowns/menu/MenuItem'
import MenuGroup from '@components/dropdowns/menu/MenuGroup'
import { HoverMenuItemProps } from '@interfaces/ui/components/dropdowns/menu/HoverMenuItemProps'

const HoverMenuItem: FC<HoverMenuItemProps> = ({
    label,
    color,
    subMenuItems,
    submenuRef
}): ReactNode => {
    const { theme } = useTheme()

    const buttonRef = useRef<HTMLDivElement | null>(null)

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
            className={'hover-menu-wrapper'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={buttonRef}
                className={'menu-item hover-menu-item'}
                style={{
                    backgroundColor: isHovered ? theme.secondary : theme.surface
                }}
            >
                <Text
                    color={isHovered && !color ? theme.primary : componentColor}
                    fontSize={14}
                    isSelectable={false}
                >
                    {label}
                </Text>
                <Icon
                    size={16}
                    color={isHovered && !color ? theme.primary : componentColor}
                >
                    <ChevronRightIcon/>
                </Icon>
                <MenuDropdown
                    isOpen={isHovered}
                    anchorRef={submenuRef}
                    dropdownRef={submenuRef}
                    buttonRef={buttonRef}
                    isSubMenu
                >
                    <MenuGroup>
                        {subMenuItems().map((item, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    onClick={item.onClick}
                                    onClose={() => {
                                        item.onClose()
                                        setIsHovered(false)
                                    }}
                                    label={item.label}
                                    icon={item.icon}
                                    iconColor={item.color}
                                />
                            )
                        })}
                    </MenuGroup>
                </MenuDropdown>
            </div>
        </div>
    )
}

export default HoverMenuItem
