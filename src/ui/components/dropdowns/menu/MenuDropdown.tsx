import React, { type FC, useEffect, useState } from 'react'
import { MenuDropdownProps } from '@interfaces/ui/components/dropdowns/menu/MenuDropdownProps'
import './menu-dropdown.css'
import { handleFadeEffect } from '@utils/AnimationUtils'

const MenuDropdown: FC<MenuDropdownProps> = ({
    children,
    isOpen,
    position = 'right'
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isFadingIn, setIsFadingIn] = useState(false)

    useEffect(() => {
        handleFadeEffect(isOpen, setIsVisible, setIsFadingIn)
    }, [isOpen])

    if (!isVisible) {
        return null
    }

    return (
        <div
            className={`menu-dropdown ${position} ${isFadingIn ? 'fade-in' : 'fade-out'}`}
        >
            {children}
        </div>
    )
}

export default MenuDropdown
