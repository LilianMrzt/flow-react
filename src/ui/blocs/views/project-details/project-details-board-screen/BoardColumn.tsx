import React, { FC, ReactNode } from 'react'
import './board-column.css'
import Text from '@components/text/Text'
import {
    BoardColumnProps
} from '@interfaces/ui/blocs/views/project-details/project-details-board-screen/BoardColumnProps'

const BoardColumn: FC<BoardColumnProps> = ({
    column
}): ReactNode => {
    return (
        <div
            className={'board-column'}
        >
            <div
                className={'board-column-header'}
            >
                <Text>
                    {column.name}
                </Text>
                <Text>
                    {column.tasks.length.toString()}
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
