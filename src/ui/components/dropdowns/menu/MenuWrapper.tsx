import React, { type FC } from 'react'
import { MenuWrapperProps } from '@interfaces/ui/components/dropdowns/menu/MenuWrapperProps'
import './menu-wrapper.css'
import { useClickOutside } from '@hooks/hooks/useClickOutside'

const MenuWrapper: FC<MenuWrapperProps> = ({
    children,
    onClose,
    anchorRef,
    dropdownRef,
    subMenuRef,
    isMenuOpen
}) => {
    const refs = [anchorRef, dropdownRef]
    if (subMenuRef) {
        refs.push(subMenuRef)
    }

    useClickOutside(refs, () => {
        onClose()
    },
    isMenuOpen)

    return (
        <div
            className={'menu-wrapper'}
        >
            {children}
        </div>
    )
}

export default MenuWrapper
