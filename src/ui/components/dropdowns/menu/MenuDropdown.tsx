import React, { type FC, useEffect, useState } from 'react'
import { MenuDropdownProps } from '@interfaces/ui/components/dropdowns/menu/MenuDropdownProps'
import './menu-dropdown.css'
import { createPortal } from 'react-dom'
import { useFadeVisibility } from '@hooks/hooks/useFadeVisibility'

const MenuDropdown: FC<MenuDropdownProps> = ({
    children,
    isOpen,
    position = 'right',
    anchorRef,
    dropdownRef,
    buttonRef,
    isSubMenu = false
}) => {
    const {
        isVisible,
        isFadingIn
    } = useFadeVisibility(isOpen)

    const [coords, setCoords] = useState({ top: 0, left: 0, xOffset: 0 })

    /**
     * Gestion des coordonnées du Dropdown
     */
    useEffect(() => {
        if (!isOpen) return

        const refToUse = isSubMenu ? buttonRef : anchorRef

        if (refToUse?.current) {
            const rect = refToUse.current.getBoundingClientRect()
            const dropdownWidth = 220

            let top = rect.bottom + window.scrollY + 4
            let left = rect.left + window.scrollX
            let xOffset = 0

            if (isSubMenu) {
                top = rect.top + window.scrollY - 4

                const willOverflowRight = rect.right + dropdownWidth > window.innerWidth
                if (willOverflowRight) {
                    left = rect.left - dropdownWidth + window.scrollX
                    xOffset = -4
                } else {
                    left = rect.right + window.scrollX
                    xOffset = 4
                }
            } else if (position === 'right') {
                left = rect.right - dropdownWidth + window.scrollX
            }

            setCoords({ top, left, xOffset })
        }
    }, [isOpen, anchorRef, buttonRef, position, isSubMenu])

    if (!isVisible) {
        return null
    }

    return createPortal(
        <>
            {isSubMenu && (
                <div
                    ref={dropdownRef}
                    className={'submenu-mouse-bridge'}
                    style={{
                        top: coords.top,
                        left: coords.left + (coords.xOffset > 0 ? -4 : 216)
                    }}
                />
            )}
            <div
                ref={dropdownRef}
                className={`menu-dropdown ${isFadingIn ? 'fade-in' : 'fade-out'} ${isSubMenu ? 'submenu' : ''}`}
                style={{
                    top: coords.top,
                    left: coords.left,
                    transform: `translateX(${coords.xOffset}px)`
                }}
            >
                {children}
            </div>
        </>,
        document.body
    )
}

export default MenuDropdown
