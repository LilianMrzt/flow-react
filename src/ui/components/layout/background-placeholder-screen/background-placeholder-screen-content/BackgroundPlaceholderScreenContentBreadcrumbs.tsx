import React, { ReactNode } from 'react'
import Icon from '@components/resources/Icon'
import { ArrowRightIcon, ChevronRightThinIcon } from '@resources/Icons'
import Row from '@components/layout/Row'
import './background-placeholder-screen-content-breadcrumbs.css'

const BackgroundPlaceholderScreenContentBreadcrumbs = (): ReactNode => {
    return (
        <Row
            width={'fit-content'}
            height={30}
        >
            <Icon
                size={16}
            >
                <ArrowRightIcon/>
            </Icon>
            <div
                className={'background-placeholder-screen-content-breadcrumbs-first-label'}
            />
            <Icon
                size={20}
            >
                <ChevronRightThinIcon/>
            </Icon>
            <div
                className={'background-placeholder-screen-content-breadcrumbs-second-label'}
            />
        </Row>
    )
}

export default BackgroundPlaceholderScreenContentBreadcrumbs
