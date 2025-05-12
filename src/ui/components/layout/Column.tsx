import React, { type FC, type ReactNode } from 'react'
import './column.css'
import { ColumnProps } from '@interfaces/ui/components/layout/ColumnProps'

const Column: FC<ColumnProps> = ({
    children,
    className,
    gap,
    justifyContent,
    alignItems,
    height,
    width,
    border,
    padding
}): ReactNode => {
    return (
        <div
            className={`column ${className ?? ''}`}
            style={{
                gap: gap ?? 8,
                justifyContent: justifyContent ?? 'center',
                alignItems: alignItems ?? 'center',
                height: height ?? '100%',
                width: width ?? '100%',
                border: border ?? 'none',
                padding: padding
            }}
        >
            {children}
        </div>
    )
}

export default Column
