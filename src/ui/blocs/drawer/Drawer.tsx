import React, { ReactNode, useEffect, useState } from 'react'
import './drawer.css'
import IconButton from '@components/buttons/IconButton'
import { ChevronLeftIcon, ChevronRightIcon, FolderIcon, LayersIcon, WavesIcon } from '@resources/Icons'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Icon from '@components/resources/Icon'
import { DrawerRoutes } from '@constants/routes/DrawerRoutes'
import DrawerItem from '@ui/blocs/drawer/DrawerItem'
import { useProjects } from '@hooks/contexts/api/ProjectsContext'
import { ProjectDetailsDrawerRoutes } from '@constants/routes/ProjectDetailsDrawerRoutes'
import Separator from '@components/layout/Separator'
import DrawerTitle from '@ui/blocs/drawer/DrawerTitle'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import DrawerItemGroup from '@ui/blocs/drawer/drawer-item-group/DrawerItemGroup'
import { ProjectDetailsSettingsRoutes } from '@constants/routes/ProjectDetailsSettingsRoutes'
import { matchPath, useLocation } from 'react-router'
import { StorageConstants } from '@constants/StorageConstants'

const Drawer = (): ReactNode => {
    const location = useLocation()
    const { theme } = useTheme()
    const { activeProjectKey } = useProjects()

    /**
     * Récupère l'état initial du drawer depuis le localStorage.
     * Retourne false uniquement si la valeur enregistrée est 'false', sinon true par défaut.
     */
    const getInitialDrawerState = (): boolean => {
        const value = localStorage.getItem(StorageConstants.isDrawerOpen)
        return value !== 'false'
    }

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(getInitialDrawerState)

    const isOnProjectPage = !!matchPath('/projects/:key/*', location.pathname)

    /**
     * Met à jour le localStorage à chaque fois que l'état du drawer change.
     */
    useEffect(() => {
        localStorage.setItem(StorageConstants.isDrawerOpen, String(isDrawerOpen))
    }, [isDrawerOpen])

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
            <DrawerTitle
                isDrawerOpen={isDrawerOpen}
                label={'App Navigation'}
                icon={<LayersIcon/>}
            />
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
            </div>
            {activeProjectKey && isOnProjectPage && (
                <>
                    <Separator/>
                    <DrawerTitle
                        isDrawerOpen={isDrawerOpen}
                        label={'Project Navigation'}
                        icon={<FolderIcon/>}
                    />
                    <div
                        className={'drawer-content'}
                    >
                        {Object.entries(ProjectDetailsDrawerRoutes).map(([key, route]) => {
                            return (
                                <DrawerItem
                                    key={key}
                                    route={route}
                                    isProjectDetails
                                />
                            )
                        })}
                        <DrawerItemGroup
                            isProjectDetails={true}
                            parentRoute={ProjectsRoutes.projectDetailsSettings}
                            childrenRoutes={Object.values(ProjectDetailsSettingsRoutes)}
                            isDrawerOpen={isDrawerOpen}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Drawer
