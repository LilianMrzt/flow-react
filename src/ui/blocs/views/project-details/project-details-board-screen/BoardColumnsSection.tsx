import React, { ReactNode } from 'react'
import './board-column-section.css'
import BoardColumn from '@ui/blocs/views/project-details/project-details-board-screen/BoardColumn'

const BoardColumnsSection = (): ReactNode => {
    return (
        <div
            className={'board-column-section'}
        >
            <BoardColumn/>
            <BoardColumn/>
            <BoardColumn/>
            <BoardColumn/>
            <BoardColumn/>
            <BoardColumn/>
            <BoardColumn/>
            <BoardColumn/>
            <BoardColumn/>
            <BoardColumn/>
        </div>
    )
}

export default BoardColumnsSection
