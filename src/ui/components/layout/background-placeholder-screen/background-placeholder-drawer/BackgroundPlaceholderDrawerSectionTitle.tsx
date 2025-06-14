import React, { ReactNode } from 'react'
import './background-placeholder-drawer-section-title.css'

const BackgroundPlaceholderDrawerSectionTitle = (): ReactNode => {
    return (
        <div
            className={'background-placeholder-drawer-section-title'}
        >
            <div
                className={'background-placeholder-drawer-section-title-icon'}
            />
            <div
                className={'background-placeholder-drawer-section-title-label'}
            />
        </div>
    )
}

export default BackgroundPlaceholderDrawerSectionTitle
