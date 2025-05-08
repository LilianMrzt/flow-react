import { CSSProperties, ReactNode } from 'react'

export interface MenuGroupProps {
    children: ReactNode
    gap?: CSSProperties['gap']
    padding?: CSSProperties['padding']
}
