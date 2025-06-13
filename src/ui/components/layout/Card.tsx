import React, { type FC, type ReactNode, useState } from 'react'
import './card.css'
import { CardProps } from '@interfaces/ui/components/layout/CardProps'

const Card: FC<CardProps> = ({
    children,
    className,
    width,
    height,
    padding,
    alignItems,
    gap,
    onClick,
    hoverShadow,
    onMouseEnter,
    onMouseLeave,
    maxWidth
}): ReactNode => {

    const [isHovered, setIsHovered] = useState(false)

    /**
     * Gestion du click sur la card
     */
    const handleClick = (): void => {
        if(onClick) {
            onClick()
        }
    }

    /**
     * Gère l'événement de survol de la souris
     */
    const handleMouseEnter = (): void => {
        setIsHovered(true)
        if (onMouseEnter) {
            onMouseEnter()
        }
    }

    /**
     * Gère la fin du survol de la souris
     */
    const handleMouseLeave = (): void => {
        setIsHovered(false)
        if (onMouseLeave) {
            onMouseLeave()
        }
    }

    return (
        <div
            className={`card ${isHovered && hoverShadow ? 'card-hover-shadow' : ''} ${className}`}
            style={{
                maxWidth: maxWidth,
                height: height ?? 'fit-content',
                padding: padding ?? 16,
                gap: gap ?? 16,
                alignItems: alignItems ?? 'center',
                width
            }}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    )
}

export default Card
