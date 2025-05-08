import React, { ReactNode } from 'react'
import { useUser } from '@hooks/contexts/api/UserContext'
import './user-avatar.css'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/contexts/ThemeContext'

const UserAvatar = (): ReactNode => {
    const {
        user
    } = useUser()

    const {
        theme
    } = useTheme()

    if (!user) {
        return (
            <div/>
        )
    }

    const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()

    return (
        user.profilePictureUrl ? (
            <img
                className={'user-avatar'}
                src={user.profilePictureUrl}
                alt={'Profile'}
            />
        ) : (
            <div
                className={'user-avatar'}
                style={{
                    backgroundColor: user.color
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
        )
    )
}

export default UserAvatar
