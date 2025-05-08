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
import { AuthRoutes } from '@constants/routes/AuthRoutes'
import { useNavigate } from 'react-router-dom'

const AvatarDropdown: FC<AvatarDropdownProps> = ({
    isOpen,
    onClose
}): ReactNode => {
    const {
        theme
    } = useTheme()

    const {
        user,
        logout
    } = useUser()

    const navigate = useNavigate()

    return (
        <MenuDropdown
            isOpen={isOpen}
        >
            <MenuGroup
                gap={4}
                padding={12}
            >
                <Text>
                    {`${user.firstName} ${user.lastName}`}
                </Text>
                <Text
                    fontSize={14}
                    color={theme.textSecondary}
                >
                    {user.email}
                </Text>
            </MenuGroup>
            <Separator/>
            <MenuGroup>
                <MenuItem
                    label={'Profile'}
                    onClick={() => {}}
                    onClose={onClose}
                    icon={<UserIcon/>}
                />
                <MenuItem
                    label={'Settings'}
                    onClick={() => {}}
                    onClose={onClose}
                    icon={<SettingsIcon/>}
                />
            </MenuGroup>
            <Separator/>
            <MenuGroup>
                <MenuItem
                    label={'Log out'}
                    icon={<LogoutIcon/>}
                    onClick={() => {
                        logout()
                        navigate(AuthRoutes.signIn.path)
                    }}
                    color={theme.error}
                    onClose={onClose}
                />
            </MenuGroup>
        </MenuDropdown>
    )
}

export default AvatarDropdown
