import React, { ReactNode, useState } from 'react'
import './drawer.css'
import IconButton from '@components/buttons/IconButton'
import { ChevronLeftIcon, ChevronRightIcon, WavesIcon } from '@resources/Icons'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Icon from '@components/resources/Icon'

const Drawer = (): ReactNode => {
    const {
        theme
    }
 = useTheme()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <div
            className={'drawer'}
            style={{
                width: isDrawerOpen ? 300 : 60,
                minWidth: isDrawerOpen ? 300 : 60
            }}
        >
            <div
                className={'drawer-toggle'}
            >
                <IconButton
                    onClick={() => {
                        setIsDrawerOpen(!isDrawerOpen)
                    }}
                    backgroundColor={theme.surface}
                    hoverBackgroundColor={theme.secondary}
                    hoverColor={theme.primary}
                >
                    {isDrawerOpen ? (
                        <ChevronLeftIcon/>
                    ) : (
                        <ChevronRightIcon/>
                    )}
                </IconButton>
                <div
                    className={'drawer-toggle-app-name'}
                >
                    <Icon
                        size={24}
                        color={theme.primary}
                    >
                        <WavesIcon/>
                    </Icon>
                    <h1
                        className={'drawer-toggle-app-name-text'}
                    >
                        Flow
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Drawer
