import React, { type FC, useRef } from 'react'
import { MenuWrapperProps } from '@interfaces/ui/components/dropdowns/menu/MenuWrapperProps'
import './menu-wrapper.css'
import { useClickOutside } from '@hooks/hooks/useClickOutside'

const MenuWrapper: FC<MenuWrapperProps> = ({
    children,
    onClose
}) => {
    const ref = useRef<HTMLDivElement>(null)

    useClickOutside(ref, () => {
        onClose()
    })

    return (
        <div

            ref={ref}
            className={'menu-wrapper'}
        >
            {children}
        </div>
    )
}

export default MenuWrapper
