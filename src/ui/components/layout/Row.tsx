import React, { type FC } from 'react'
import './row.css'
import { RowProps } from '@interfaces/ui/components/layout/RowProps'

const Row: FC<RowProps> = ({
    children,
    className,
    justifyContent,
    alignItems,
    width,
    height,
    gap
}) => {

    return (
        <div
            className={`row ${className ?? ''}`}
            style={{
                gap: gap ?? 8,
                justifyContent: justifyContent ?? 'center',
                alignItems: alignItems ?? 'center',
                height: height ?? 'fit-content',
                width: width ?? '100%'
            }}
            onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}

        >
            {children}
        </div>
    )
}

export default Row
