import React, { FC, ReactNode } from 'react'
import MenuDropdown from '@components/dropdowns/menu/MenuDropdown'
import MenuGroup from '@components/dropdowns/menu/MenuGroup'
import Text from '@components/text/Text'
import MenuItem from '@components/dropdowns/menu/MenuItem'
import Separator from '@components/layout/Separator'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { LogoutIcon, SettingsIcon, UserIcon } from '@resources/Icons'
import { AvatarDropdownProps } from '@interfaces/ui/blocs/header/components/AvatarDropdownProps'
import { useUser } from '@hooks/contexts/api/UserContext'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '@constants/routes/AppRoutes'

const AvatarDropdown: FC<AvatarDropdownProps> = ({
    isOpen,
    onClose,
    anchorRef,
    dropdownRef
}): ReactNode => {
    const { theme } = useTheme()
    const { user, logout } = useUser()

    const navigate = useNavigate()

    return (
        <MenuDropdown
            isOpen={isOpen}
            anchorRef={anchorRef}
            dropdownRef={dropdownRef}
        >
            <MenuGroup
                gap={4}
                padding={12}
            >
                <Text>
                    {`${user?.firstName} ${user?.lastName}`}
                </Text>
                <Text
                    fontSize={14}
                    color={theme.textSecondary}
                >
                    {user?.email}
                </Text>
            </MenuGroup>
            <Separator/>
            <MenuGroup>
                <MenuItem
                    label={'Profile'}
                    onClick={() => {
                        navigate(AppRoutes.profile.path)
                    }}
                    onClose={onClose}
                    icon={<UserIcon/>}
                />
                <MenuItem
                    label={'Settings'}
                    onClick={() => {
                        navigate(AppRoutes.settings.path)
                    }}
                    onClose={onClose}
                    icon={<SettingsIcon/>}
                />
            </MenuGroup>
            <Separator/>
            <MenuGroup>
                <MenuItem
                    label={'Log out'}
                    icon={<LogoutIcon/>}
                    onClick={logout}
                    color={theme.error}
                    iconColor={theme.error}
                    onClose={onClose}
                />
            </MenuGroup>
        </MenuDropdown>
    )
}

export default AvatarDropdown
