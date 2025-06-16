import Button from '@components/buttons/Button'
import Row from '@components/layout/Row'
import React, { FC, ReactNode } from 'react'
import { useTheme } from '@hooks/contexts/ThemeContext'
import {
    TaskModalEditFieldButtonRowProps
} from '@interfaces/ui/blocs/views/app/project-details/task-modal/TaskModalEditFieldButtonRowProps'

export const TaskModalEditFieldButtonRow: FC<TaskModalEditFieldButtonRowProps> = ({
    onSaveButtonClick,
    onCancelButtonClick
}): ReactNode => {
    const {
        theme
    } = useTheme()

    return (
        <Row
            justifyContent={'end'}
            gap={4}
        >
            <Button
                onClick={onSaveButtonClick}
                label={'Save'}
                minHeight={38}
                fontWeight={600}
            />
            <Button
                onClick={onCancelButtonClick}
                label={'Cancel'}
                backgroundColor={theme.surface}
                borderColor={theme.surface}
                hoverBackgroundColor={theme.tertiary}
                color={theme.textSecondary}
                fontWeight={600}
            />
        </Row>
    )
}
