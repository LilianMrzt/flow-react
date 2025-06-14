import React, { ReactNode } from 'react'
import Row from '@components/layout/Row'
import './background-placeholder-screen-content-columns.css'

const BackgroundPlaceholderScreenContentColumns = (): ReactNode => {
    return (
        <Row
            height={'100%'}
            width={'100%'}
            justifyContent={'start'}
            gap={16}
        >
            <div
                className={'background-placeholder-screen-content-column'}
            />
            <div
                className={'background-placeholder-screen-content-column'}
            />
            <div
                className={'background-placeholder-screen-content-column'}
            />
        </Row>
    )
}

export default BackgroundPlaceholderScreenContentColumns
