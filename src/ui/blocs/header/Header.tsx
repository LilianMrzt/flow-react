import React, { ReactNode } from 'react'
import './header.css'
import UserAvatar from '@ui/blocs/header/components/UserAvatar'

const Header = (): ReactNode => {
    return (
        <header
            className={'header'}
        >
            <UserAvatar/>
        </header>
    )
}

export default Header
