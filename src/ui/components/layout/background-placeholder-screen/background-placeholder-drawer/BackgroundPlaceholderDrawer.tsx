import React, { ReactNode } from 'react'
import BackgroundPlaceholderDrawerSectionTitle
    from '@components/layout/background-placeholder-screen/background-placeholder-drawer/BackgroundPlaceholderDrawerSectionTitle'
import BackgroundPlaceholderDrawerItem
    from '@components/layout/background-placeholder-screen/background-placeholder-drawer/BackgroundPlaceholderDrawerItem'
import Separator from '@components/layout/Separator'
import { useTheme } from '@hooks/contexts/ThemeContext'
import './background-placeholder-drawer.css'
import BackgroundPlaceholderDrawerTopSection
    from '@components/layout/background-placeholder-screen/background-placeholder-drawer/BackgroundPlaceholderDrawerTopSection'

const BackgroundPlaceholderDrawer = (): ReactNode => {
    const { theme } = useTheme()

    return (
        <div
            className={'background-placeholder-drawer'}
        >
            <BackgroundPlaceholderDrawerTopSection/>
            <div
                className={'background-placeholder-drawer-content'}
            >
                <BackgroundPlaceholderDrawerSectionTitle/>
                <BackgroundPlaceholderDrawerItem/>
                <BackgroundPlaceholderDrawerItem/>
                <BackgroundPlaceholderDrawerItem/>
                <BackgroundPlaceholderDrawerItem/>
            </div>
            <Separator
                backgroundColor={theme.outlineSecondary}
            />
            <div
                className={'background-placeholder-drawer-content'}
            >
                <BackgroundPlaceholderDrawerSectionTitle/>
                <BackgroundPlaceholderDrawerItem/>
                <BackgroundPlaceholderDrawerItem
                    isSelected
                />
                <BackgroundPlaceholderDrawerItem/>
                <BackgroundPlaceholderDrawerItem/>
            </div>
        </div>
    )
}

export default BackgroundPlaceholderDrawer
