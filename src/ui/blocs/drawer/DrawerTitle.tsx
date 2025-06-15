import React, { FC, ReactNode } from 'react'
import Icon from '@components/resources/Icon'
import Text from '@components/text/Text'
import { DrawerTitleProps } from '@interfaces/ui/blocs/drawer/DrawerTitleProps'
import { useTheme } from '@hooks/contexts/ThemeContext'
import './drawer-title.css'

const DrawerTitle: FC<DrawerTitleProps> = ({
    isDrawerOpen,
    label,
    icon
}): ReactNode => {
    const {
        theme
    } = useTheme()

    return (
        <div
            className={'drawer-title'}
        >
            <Icon
                size={16}
                color={theme.textSecondary}
            >
                {icon}
            </Icon>
            <div
                className={'drawer-title-text'}
                style={{
                    opacity: isDrawerOpen ? 1 : 0
                }}
            >
                <Text
                    fontSize={14}
                    color={theme.textSecondary}
                    noWrap
                >
                    {label}
                </Text>
            </div>
        </div>
    )
}

export default DrawerTitle
