import { CSSProperties, RefObject } from 'react'
import { MenuItemProps } from '@interfaces/ui/components/dropdowns/menu/MenuItemProps'

export interface HoverMenuItemProps {
    label: string
    color?: CSSProperties['color']
    subMenuItems: () => MenuItemProps[]
    submenuRef: RefObject<HTMLDivElement | null>
}
