import React, { FC, ReactNode } from 'react'
import Column from '@components/layout/Column'
import { ScreenProps } from '@interfaces/ui/components/layout/ScreenProps'
import './screen.css'

const Screen: FC<ScreenProps> = ({
    children
}): ReactNode => {
    return (
        <Column
            className={'screen'}
            alignItems={'center'}
            justifyContent={'flex-start'}
        >
            {children}
        </Column>
    )
}

export default Screen
