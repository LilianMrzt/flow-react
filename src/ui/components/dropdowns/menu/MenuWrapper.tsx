import React, { type FC } from 'react'
import { MenuWrapperProps } from '@interfaces/ui/components/dropdowns/menu/MenuWrapperProps'
import './menu-wrapper.css'
import { useClickOutside } from '@hooks/hooks/useClickOutside'

const MenuWrapper: FC<MenuWrapperProps> = ({
    children,
    onClose,
    anchorRef
}) => {

    useClickOutside(anchorRef, () => {
        onClose()
    })

    return (
        <div
            ref={anchorRef}
            className={'menu-wrapper'}
        >
            {children}
        </div>
    )
}

export default MenuWrapper
