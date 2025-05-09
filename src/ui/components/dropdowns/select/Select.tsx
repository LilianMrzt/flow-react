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

const Select: FC<SelectProps> = ({
    label,
    value,
    onChange,
    options
}) => {
    const {
        theme
    } = useTheme()

    const ref = useRef<HTMLDivElement>(null)

    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isFadingIn, setIsFadingIn] = useState(false)

    const selected = options.find(o => {
        return o.value === value
    })

    useClickOutside(ref, () => {
        setIsOpen(false)
    })

    useEffect(() => {
        handleFadeEffect(isOpen, setIsVisible, setIsFadingIn)
    }, [isOpen])

    return (
        <div
            className={'select-wrapper'}
        >
            <Text>
                {label}
            </Text>
            <div
                ref={ref}
            >
                <div
                    className={'select-input'}
                    style={{
                        borderColor: isOpen ? theme.primary : theme.outline
                    }}
                    onClick={() => {
                        return setIsOpen(prev => {
                            return !prev
                        })
                    }}
                >
                    <Text
                        isSelectable={false}
                    >
                        {selected?.label ?? 'Select an option'}
                    </Text>
                    <Icon
                        size={20}
                        color={theme.textSecondary}
                    >
                        <ChevronDownIcon/>
                    </Icon>
                </div>
                {isVisible && (
                    <div
                        className={`select-dropdown ${isFadingIn ? 'fade-in' : 'fade-out'}`}
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
                    </div>
                )}
            </div>
        </div>
    )
}

export default Select
