import React, { ReactNode, useState } from 'react'
import './drawer.css'
import IconButton from '@components/buttons/IconButton'
import { ChevronLeftIcon, ChevronRightIcon } from '@resources/Icons'
import { useTheme } from '@hooks/contexts/ThemeContext'

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
                    iconSize={24}
                    className={'drawer-toggle-button'}
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
            </div>
        </div>
    )
}

export default Drawer
