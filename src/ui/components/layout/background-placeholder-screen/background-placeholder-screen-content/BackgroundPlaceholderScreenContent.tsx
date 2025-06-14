import React, { ReactNode } from 'react'
import Column from '@components/layout/Column'
import BackgroundPlaceholderScreenContentBreadcrumbs
    from '@components/layout/background-placeholder-screen/background-placeholder-screen-content/BackgroundPlaceholderScreenContentBreadcrumbs'
import './background-placeholder-screen-content.css'
import BackgroundPlaceholderScreenContentColumns
    from '@components/layout/background-placeholder-screen/background-placeholder-screen-content/BackgroundPlaceholderScreenContentColumns'
import BackgroundPlaceholderScreenContentTitle
    from '@components/layout/background-placeholder-screen/background-placeholder-screen-content/BackgroundPlaceholderScreenContentTitle'

const BackgroundPlaceholderScreenContent = (): ReactNode => {
    return (
        <Column
            className={'background-placeholder-screen-content'}
            justifyContent={'start'}
            gap={16}
            alignItems={'start'}
        >
            <BackgroundPlaceholderScreenContentBreadcrumbs/>
            <BackgroundPlaceholderScreenContentTitle/>
            <BackgroundPlaceholderScreenContentColumns/>
        </Column>
    )
}

export default BackgroundPlaceholderScreenContent
