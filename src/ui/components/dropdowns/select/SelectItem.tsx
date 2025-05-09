import React, { FC, ReactNode, useState } from 'react'
import Text from '@components/text/Text'
import './select-item.css'
import Icon from '@components/resources/Icon'
import { CheckIcon } from '@resources/Icons'
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

    const backgroundColor = isSelected ? (isHovered ? theme.hoverSecondary : theme.secondary) : (isHovered ? theme.secondary : theme.surface)
    const color = isSelected || isHovered ? theme.primary : theme.text

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
            {isSelected && (
                <div
                    className={'select-item-selected-icon'}
                >
                    <Icon
                        size={18}
                        color={color}
                    >
                        <CheckIcon/>
                    </Icon>
                </div>
            )}
            <Text
                color={color}
            >
                {option.label}
            </Text>
        </div>
    )
}

export default SelectItem
