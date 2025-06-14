import React, { ReactNode } from 'react'
import Row from '@components/layout/Row'
import './background-placeholder-screen-content-title.css'
import Column from '@components/layout/Column'

const BackgroundPlaceholderScreenContentTitle = (): ReactNode => {
    return (
        <Row
            width={'100%'}
            justifyContent={'space-between'}
        >
            <Column
                alignItems={'start'}
            >
                <div
                    className={'background-placeholder-screen-content-title'}
                />
                <div
                    className={'background-placeholder-screen-content-subtitle'}
                />
            </Column>
            <div
                className={'background-placeholder-screen-content-title-button'}
            >
                <div
                    className={'background-placeholder-screen-content-title-button-content'}
                />
            </div>
        </Row>
    )
}

export default BackgroundPlaceholderScreenContentTitle
