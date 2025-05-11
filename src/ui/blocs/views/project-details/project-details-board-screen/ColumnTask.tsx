import React, { FC, ReactNode, useRef } from 'react'
import Text from '@components/text/Text'
import { ColumnTaskProps } from '@interfaces/ui/blocs/views/project-details/project-details-board-screen/ColumnTaskProps'
import './column-task.css'
import { createDragImageFromElement } from '@utils/DragUtils'

interface ColumnTaskExtendedProps extends ColumnTaskProps {
    onHoverPosition: (position: 'top' | 'bottom') => void
}

const ColumnTask: FC<ColumnTaskExtendedProps> = ({ task, onHoverPosition }): ReactNode => {
    const ref = useRef<HTMLDivElement | null>(null)

    return (
        <div
            ref={ref}
            className={'column-task'}
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', task.id)
                if (ref.current) createDragImageFromElement(e, ref.current)
            }}
            onDragOver={(e) => {
                e.preventDefault()
                const rect = e.currentTarget.getBoundingClientRect()
                const isTop = e.clientY <= rect.top + rect.height / 2
                onHoverPosition(isTop ? 'top' : 'bottom')
            }}
        >
            <Text isSelectable={false}>{task.title}</Text>
        </div>
    )
}

export default ColumnTask
