import React, { type FC, type ReactNode } from 'react'
import './card.css'
import { CardProps } from '@interfaces/ui/components/layout/CardProps'
import Column from '@components/layout/Column'

const Card: FC<CardProps> = ({
    children,
    gap,
    justifyContent,
    className,
    height,
    width,
    alignItems
}): ReactNode => {
    return (
        <Column
            className={`card ${className}`}
            gap={gap}
            justifyContent={justifyContent}
            height={height ?? 'fit-content'}
            width={width ?? 400}
            alignItems={alignItems}
        >
            {children}
        </Column>
    )
}

export default Card
