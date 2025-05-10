import React, { FC, useEffect, useRef, useState } from 'react'
import { SelectProps } from '@interfaces/ui/components/dropdowns/select/SelectProps'
import Text from '@components/text/Text'
import './select.css'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { useClickOutside } from '@hooks/hooks/useClickOutside'
import Icon from '@components/resources/Icon'
import { ChevronDownIcon } from '@resources/Icons'
import SelectItem from '@components/dropdowns/select/SelectItem'
import { handleFadeEffect } from '@utils/AnimationUtils'
import Row from '@components/layout/Row'
import { createPortal } from 'react-dom'

const Select: FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    backgroundColor,
    borderColor
}) => {
    const {
        theme
    } = useTheme()

    const inputRef = useRef<HTMLDivElement | null>(null)

    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isFadingIn, setIsFadingIn] = useState(false)
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })

    const selected = options.find(o => {
        return o.value === value
    })

    useClickOutside([inputRef], () => {
        setIsOpen(false)
    })

    useEffect(() => {
        handleFadeEffect(isOpen, setIsVisible, setIsFadingIn)
    }, [isOpen])

    /**
     * Gestion des coordonnées et de la largeur du Dropdown
     */
    useEffect(() => {
        if (isOpen && inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect()
            setCoords({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: rect.width
            })
        }
    }, [isOpen])

    return (
        <div
            className={'select-wrapper'}
        >
            {label && (
                <Text>
                    {label}
                </Text>
            )}
            <div
                ref={inputRef}
            >
                <div
                    className={'select-input'}
                    style={{
                        borderColor: isOpen ? theme.primary : borderColor ?? theme.outline,
                        backgroundColor: backgroundColor ?? theme.surface
                    }}
                    onClick={() => {
                        return setIsOpen(prev => {
                            return !prev
                        })
                    }}
                >
                    <Row
                        width={'fit-content'}
                    >
                        {selected?.icon && (
                            <Icon
                                size={20}
                                color={selected.iconColor ?? theme.textSecondary}
                            >
                                {selected.icon}
                            </Icon>
                        )}
                        <Text
                            isSelectable={false}
                            maxLines={1}
                        >
                            {selected?.label ?? 'Select an option'}
                        </Text>
                    </Row>
                    <Icon
                        size={20}
                        color={theme.textSecondary}
                    >
                        <ChevronDownIcon/>
                    </Icon>
                </div>
                {isVisible && (
                    createPortal(
                        <div
                            className={`select-dropdown ${isFadingIn ? 'fade-in' : 'fade-out'}`}
                            style={{
                                top: coords.top,
                                left: coords.left,
                                width: coords.width
                            }}
                        >
                            {options.map(option => {
                                return (
                                    <SelectItem
                                        key={option.value}
                                        onClick={() => {
                                            onChange(option.value)
                                            setIsOpen(false)
                                        }}
                                        option={option}
                                        value={value}
                                    />
                                )
                            })}
                        </div>,
                        document.body
                    ))}
            </div>
        </div>
    )
}

export default Select
