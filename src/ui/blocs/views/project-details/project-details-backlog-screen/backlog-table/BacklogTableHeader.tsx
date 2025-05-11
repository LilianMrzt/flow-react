import React, { ReactNode } from 'react'
import './backlog-table-header.css'
import BackTableCell
    from '@ui/blocs/views/project-details/project-details-backlog-screen/backlog-table/BackTableCell'
import Text from '@components/text/Text'
import { useTheme } from '@hooks/contexts/ThemeContext'

const BacklogTableHeader = (): ReactNode => {
    const {
        theme
    } = useTheme()

    return (
        <div
            className={'backlog-table-header'}
        >
            <BackTableCell
                width={100}
                justifyContent={'center'}
            >
                <Text
                    color={theme.textSecondary}
                    fontWeight={'bold'}
                >
                    Priority
                </Text>
            </BackTableCell>
            <BackTableCell
                width={'calc(70% - 100px)'}
            >
                <Text
                    color={theme.textSecondary}
                    fontWeight={'bold'}
                >
                    Title
                </Text>
            </BackTableCell>
            <BackTableCell
                width={'calc(30% - 100px)'}
            >
                <Text
                    color={theme.textSecondary}
                    fontWeight={'bold'}
                >
                    Status
                </Text>
            </BackTableCell>
            <BackTableCell
                width={100}
            />
        </div>
    )
}

export default BacklogTableHeader
