import { ReactElement } from 'react'

export type RouteType = {
    path: string
    label: string
    icon?: ReactElement
    pathFn?: (params: Record<string, string>) => string
}
