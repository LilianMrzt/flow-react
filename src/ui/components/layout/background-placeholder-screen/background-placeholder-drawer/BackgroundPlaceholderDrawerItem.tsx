import React, { FC, ReactNode } from 'react'
import './background-placeholder-drawer-item.css'
import {
    BackgroundPlaceholderDrawerItemProps
} from '@interfaces/ui/components/layout/background-placeholder-screen/background-placeholder-drawer/BackgroundPlaceholderDrawerItemProps'
import { useTheme } from '@hooks/contexts/ThemeContext'

const BackgroundPlaceholderDrawerItem: FC<BackgroundPlaceholderDrawerItemProps> = ({
    isSelected
}): ReactNode => {
    const { theme } = useTheme()

    return (
        <div
            className={'background-placeholder-drawer-item'}
            style={{
                backgroundColor: isSelected ? theme.secondaryDark : 'transparent'
            }}
        >
            <div
                className={'background-placeholder-drawer-item-icon'}
                style={{
                    backgroundColor: isSelected ? theme.primaryDark : theme.outlineSecondary
                }}
            />
            <div
                className={'background-placeholder-drawer-item-label'}
                style={{
                    backgroundColor: isSelected ? theme.primaryDark : theme.outlineSecondary
                }}
            />
        </div>
    )
}

export default BackgroundPlaceholderDrawerItem
