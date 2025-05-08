import React, { ReactNode, useState } from 'react'
import { useUser } from '@hooks/contexts/api/UserContext'
import './user-avatar.css'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/contexts/ThemeContext'
import MenuWrapper from '@components/dropdowns/menu/MenuWrapper'
import AvatarDropdown from '@ui/blocs/header/components/AvatarDropdown'

const UserAvatar = (): ReactNode => {
    const {
        user
    } = useUser()

    const {
        theme
    } = useTheme()

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    if (!user) {
        return (
            <div/>
        )
    }

    const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()

    return (
        <MenuWrapper
            onClose={() => {
                setIsDropdownOpen(false)
            }}
        >
            {user.profilePictureUrl ? (
                <img
                    className={'user-avatar'}
                    src={user.profilePictureUrl}
                    alt={'Profile'}
                    onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen)
                    }}
                />
            ) : (
                <div
                    className={'user-avatar'}
                    style={{
                        backgroundColor: user.color
                    }}
                    onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen)
                    }}
                >
                    <Text
                        color={theme.surface}
                        isSelectable={false}
                        fontSize={14}
                    >
                        {initials}
                    </Text>
                </div>
            )}
            <AvatarDropdown
                isOpen={isDropdownOpen}
                onClose={() => {
                    setIsDropdownOpen(false)
                }}
            />
        </MenuWrapper>
    )
}

export default UserAvatar
