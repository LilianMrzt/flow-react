import React, { ReactNode, useState } from 'react'
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

const Drawer = (): ReactNode => {

    const {
        theme
    } = useTheme()

    const {
        activeProjectSlug
    } = useProjects()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const isOnProjectPage = location.pathname.startsWith(ProjectsRoutes.projects.path) &&
        location.pathname !== ProjectsRoutes.projects.path &&
        location.pathname !== ProjectsRoutes.projectNotFound.path

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
            {activeProjectSlug && isOnProjectPage && (
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
                    </div>
                </>
            )}
        </div>
    )
}

export default Drawer
