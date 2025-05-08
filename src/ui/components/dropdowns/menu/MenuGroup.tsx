import React, { type FC } from 'react'
import { MenuGroupProps } from '@interfaces/ui/components/dropdowns/menu/MenuGroupProps'
import './menu-group.css'

const MenuGroup: FC<MenuGroupProps> = ({
    children,
    gap,
    padding
}) => {
    return (
        <div
            className={'menu-group'}
            style={{
                gap: gap ?? 0,
                padding: padding ?? 4
            }}
        >
            {children}
        </div>
    )
}

export default MenuGroup
