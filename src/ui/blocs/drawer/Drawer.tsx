import React, { ReactNode, useState } from 'react'
import './drawer.css'
import IconButton from '@components/buttons/IconButton'
import { ChevronLeftIcon, ChevronRightIcon, LogoutIcon, WavesIcon } from '@resources/Icons'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Icon from '@components/resources/Icon'
import { DrawerRoutes } from '@constants/routes/DrawerRoutes'
import DrawerItem from '@ui/blocs/drawer/DrawerItem'
import { useNavigate } from 'react-router-dom'
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import { useUser } from '@hooks/contexts/api/UserContext'

const Drawer = (): ReactNode => {
    const navigate = useNavigate()

    const {
        theme
    } = useTheme()

    const {
        logout
    } = useUser()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <div
            className={'drawer'}
            style={{
                width: isDrawerOpen ? 250 : 60,
                minWidth: isDrawerOpen ? 250 : 60
            }}
        >
            <div
                className={'drawer-toggle'}
                style={{
                    width: isDrawerOpen ? '100%' : 60,
                    minWidth: isDrawerOpen ? '100%' : 60
                }}
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
            <div
                className={'drawer-content'}
            >
                {Object.entries(DrawerRoutes).map(([key, route]) => {
                    return (
                        <DrawerItem
                            key={key}
                            route={route}
                        />
                    )
                })}
                <IconButton
                    onClick={() => {
                        logout()
                        navigate(AuthRoutes.signIn.path)
                    }}
                    backgroundColor={theme.surface}
                    hoverBackgroundColor={theme.secondary}
                    hoverColor={theme.primary}
                    padding={8}
                >
                    <LogoutIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Drawer
