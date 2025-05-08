import React, { ReactNode } from 'react'
import './board-column.css'
import Text from '@components/text/Text'

const BoardColumn = (): ReactNode => {
    return (
        <div
            className={'board-column'}
        >
            <div
                className={'board-column-header'}
            >
                <Text>
                    A faire
                </Text>
                <Text>
                    0
                </Text>
            </div>
            <div
                className={'board-column-content'}
            >

            </div>
        </div>
    )
}

export default BoardColumn
