import React, { FC, ReactNode, useState } from 'react'
import {
    BacklogTaskProps
} from '@interfaces/ui/blocs/views/project-details/project-details-backlog-screen/BacklogTaskProps'
import Text from '@components/text/Text'
import { TableRow } from '@components/tables/TableRow'
import { TableCell } from '@src/ui/components/tables/TableCell'
import { useTheme } from '@hooks/contexts/ThemeContext'
import './backlog-task.css'

const BacklogTask: FC<BacklogTaskProps> = ({
    task
}): ReactNode => {
    const {
        theme
    } = useTheme()

    const [isHovered, setIsHovered] = useState(false)

    /**
     * Gère l'événement de survol de la souris
     */
    const handleMouseEnter = (): void => {
        setIsHovered(true)
    }

    /**
     * Gère la fin du survol de la souris
     */
    const handleMouseLeave = (): void => {
        setIsHovered(false)
    }

    return (
        <TableRow
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            backgroundColor={isHovered ? theme.secondary : theme.background}
            className={'backlog-task'}
        >
            <TableCell>
                <Text
                    maxLines={1}
                >
                    {task.title}
                </Text>
            </TableCell>
            <TableCell>
                <Text
                    maxLines={1}
                >
                    {task.title}
                </Text>
            </TableCell>
            <TableCell>
                <Text
                    maxLines={1}
                >
                    {task.title}
                </Text>
            </TableCell>
            <TableCell>
                <Text
                    maxLines={1}
                >
                    {task.title}
                </Text>
            </TableCell>
        </TableRow>
    )
}

export default BacklogTask
