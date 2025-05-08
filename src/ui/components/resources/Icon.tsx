import React, { type FC, type ReactNode } from 'react'
import './icon.css'
import { IconProps } from '@interfaces/ui/components/resources/IconProps'

const Icon: FC<IconProps> = ({
    children,
    size = 24,
    color,
    fill,
    backgroundColor,
    padding,
    borderRadius
}): ReactNode => {
    return (
        <div
            className={'icon'}
            style={{
                height: size,
                width: size,
                minWidth: size,
                minHeight: size,
                color,
                backgroundColor,
                padding,
                fill,
                borderRadius
            }}
        >
            {children}
        </div>
    )
}

export default Icon
