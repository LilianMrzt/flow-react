import React, { type FC, useEffect, useState } from 'react'
import { MenuDropdownProps } from '@interfaces/ui/components/dropdowns/menu/MenuDropdownProps'
import './menu-dropdown.css'
import { handleFadeEffect } from '@utils/AnimationUtils'
import { createPortal } from 'react-dom'

const MenuDropdown: FC<MenuDropdownProps> = ({
    children,
    isOpen,
    position = 'right',
    anchorRef
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isFadingIn, setIsFadingIn] = useState(false)
    const [coords, setCoords] = useState({ top: 0, left: 0 })

    /**
     * Gestion des coordonnées du Dropdown
     */
    useEffect(() => {
        if (isOpen && anchorRef?.current) {
            const rect = anchorRef.current.getBoundingClientRect()
            const dropdownWidth = 220

            const top = rect.bottom + window.scrollY + 4
            const left = position === 'right'
                ? rect.right - dropdownWidth + window.scrollX
                : rect.left + window.scrollX

            setCoords({ top, left })
        }
    }, [isOpen, anchorRef, position])

    useEffect(() => {
        handleFadeEffect(isOpen, setIsVisible, setIsFadingIn)
    }, [isOpen])

    if (!isVisible) {
        return null
    }

    return createPortal(
        <div
            className={`menu-dropdown ${isFadingIn ? 'fade-in' : 'fade-out'}`}
            style={{
                top: coords.top,
                left: coords.left
            }}
        >
            {children}
        </div>,
        document.body
    )
}

export default MenuDropdown
