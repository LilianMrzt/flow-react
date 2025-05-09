import React, { FC, ReactNode } from 'react'
import Text from '@components/text/Text'
import { ColumnTaskProps } from '@interfaces/ui/blocs/views/project-details/project-details-board-screen/ColumnTaskProps'
import './column-task.css'

const ColumnTask: FC<ColumnTaskProps> = ({
    task
}): ReactNode => {
    return(
        <div
            className={'column-task'}
        >
            <Text>
                {task.title}
            </Text>
        </div>
    )
}

export default ColumnTask
