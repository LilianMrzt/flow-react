import type { CSSProperties } from 'react'
import { MenuItemProps } from '@interfaces/ui/components/dropdowns/menu/MenuItemProps'

export interface HoverMenuItemProps {
    label: string
    color?: CSSProperties['color']
    subMenuItems: () => MenuItemProps[]
}
