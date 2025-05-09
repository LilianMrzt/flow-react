import React, { ReactNode } from 'react'
import Table from '@components/tables/Table'
import TableHead from '@components/tables/TableHead'
import { TableRow } from '@components/tables/TableRow'
import { TableCell } from '@components/tables/TableCell'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Text from '@components/text/Text'
import { TableBody } from '@components/tables/TableBody'
import BacklogTask from '@ui/blocs/views/project-details/project-details-backlog-screen/BacklogTask'
import BacklogTableColumns from '@components/tables/columns/BacklogTableColumns'
import Row from '@components/layout/Row'
import { useTasks } from '@hooks/contexts/api/TasksProvider'

const BacklogTable = (): ReactNode => {
    const {
        theme
    } = useTheme()

    const {
        tasks
    } = useTasks()

    const tableHeaderColumns = [
        'Priority',
        'Title',
        'Status',
        ''
    ]

    return (
        <Table>
            <BacklogTableColumns/>
            <TableHead>
                <TableRow
                    isHeader
                    backgroundColor={theme.tertiary}
                >
                    {
                        tableHeaderColumns.map((tableRow, index) => {
                            return (
                                <TableCell
                                    key={index}
                                    isHeader
                                >
                                    {index === 0 ? (
                                        <Row>
                                            <Text color={theme.textSecondary}>
                                                {tableRow}
                                            </Text>
                                        </Row>
                                    ) : (
                                        <Text color={theme.textSecondary}>
                                            {tableRow}
                                        </Text>
                                    )}
                                </TableCell>
                            )
                        })
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {tasks.map((task) => {
                    return (
                        <BacklogTask
                            key={task.id}
                            task={task}
                        />
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default BacklogTable
