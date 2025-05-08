import { CSSProperties, ReactElement } from 'react'

export interface DashboardCardProps {
    label: string
    value: number | string
    icon: ReactElement
    iconColor: CSSProperties['color']
}
