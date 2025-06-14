import React, { FC, ReactNode } from 'react'
import Column from '@components/layout/Column'
import './background-placeholder-screen.css'
import Row from '@components/layout/Row'
import BackgroundPlaceholderDrawer
    from '@components/layout/background-placeholder-screen/background-placeholder-drawer/BackgroundPlaceholderDrawer'
import BackgroundPlaceholderScreenContent
    from '@components/layout/background-placeholder-screen/background-placeholder-screen-content/BackgroundPlaceholderScreenContent'
import {
    BackgroundPlaceholderScreenProps
} from '@interfaces/ui/components/layout/background-placeholder-screen/BackgroundPlaceholderScreenProps'

const BackgroundPlaceholderScreen: FC<BackgroundPlaceholderScreenProps> = ({
    children
}): ReactNode => {

    return (
        <Column
            className={'background-placeholder-screen'}
            alignItems={'start'}
            justifyContent={'start'}
            borderRadius={0}
            gap={0}
        >
            <Row
                height={'100%'}
                justifyContent={'start'}
                gap={0}
            >
                <BackgroundPlaceholderDrawer/>
                <Column
                    justifyContent={'start'}
                    gap={0}
                    alignItems={'start'}
                >
                    <div
                        className={'header-placeholder-dummy'}
                    />
                    <BackgroundPlaceholderScreenContent/>
                </Column>
            </Row>
            <Column
                className={'background-placeholder-screen-children'}
            >
                {children}
            </Column>
        </Column>
    )
}

export default BackgroundPlaceholderScreen
