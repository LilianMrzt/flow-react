import React, { FC, ReactNode, useRef } from 'react'
import Text from '@components/text/Text'
import { ColumnTaskProps } from '@interfaces/ui/blocs/views/project-details/project-details-board-screen/ColumnTaskProps'
import './column-task.css'
import { createDragImageFromElement } from '@utils/DragUtils'

const ColumnTask: FC<ColumnTaskProps> = ({
    task
}): ReactNode => {
    const ref = useRef<HTMLDivElement | null>(null)

    return(
        <div
            ref={ref}
            className={'column-task'}
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', task.id)

                if (ref.current) {
                    createDragImageFromElement(e, ref.current)
                }
            }}
        >
            <Text
                isSelectable={false}
            >
                {task.title}
            </Text>
        </div>
    )
}

export default ColumnTask
