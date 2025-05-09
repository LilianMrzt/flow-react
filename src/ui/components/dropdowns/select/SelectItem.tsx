import React, { FC, ReactNode, useState } from 'react'
import Text from '@components/text/Text'
import './select-item.css'
import Icon from '@components/resources/Icon'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { SelectItemProps } from '@interfaces/ui/components/dropdowns/select/SelectItemProps'

const SelectItem: FC<SelectItemProps> = ({
    option,
    value,
    onClick
}): ReactNode => {
    const {
        theme
    } = useTheme()

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

    const isSelected = option.value === value

    const backgroundColor = isSelected ? (isHovered ? theme.hoverSecondary : theme.secondary) : (isHovered ? theme.tertiary : theme.surface)
    const color = isSelected ? theme.primary : theme.text

    return (
        <div
            key={option.value}
            className={'select-item'}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                backgroundColor
            }}
        >
            {option.icon && (
                <Icon
                    size={20}
                    color={option.iconColor ?? theme.textSecondary}
                >
                    {option.icon}
                </Icon>
            )}
            <Text
                color={color}
                maxLines={1}
            >
                {option.label}
            </Text>
        </div>
    )
}

export default SelectItem
