import React, { ReactNode } from 'react'
import Icon from '@components/resources/Icon'
import { ChevronLeftIcon, WavesIcon } from '@resources/Icons'
import { useTheme } from '@hooks/contexts/ThemeContext'
import './background-placeholder-drawer-top-section.css'

const BackgroundPlaceholderDrawerTopSection = (): ReactNode => {
    const { theme } = useTheme()

    return (
        <div
            className={'background-placeholder-drawer-top-section'}
        >
            <Icon>
                <ChevronLeftIcon/>
            </Icon>
            <Icon
                size={24}
                color={theme.primaryDark}
            >
                <WavesIcon/>
            </Icon>
            <h1
                className={'background-placeholder-drawer-top-section-app-name-text'}
            >
                Flow
            </h1>
        </div>
    )
}

export default BackgroundPlaceholderDrawerTopSection
