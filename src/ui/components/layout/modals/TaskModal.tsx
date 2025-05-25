import React, { type FC, Fragment, type ReactNode, useState } from 'react'
import './task-modal.css'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@resources/Icons'
import { useTheme } from '@hooks/contexts/ThemeContext'
import IconButton from '@components/buttons/IconButton'
import { TaskModalProps } from '@interfaces/ui/components/layout/modals/TaskModalProps'
import Row from '@components/layout/Row'
import Column from '@components/layout/Column'
import TextField from '@components/inputs/TextField'
import { useFadeVisibility } from '@hooks/hooks/useFadeVisibility'

const TaskModal: FC<TaskModalProps> = ({
    isOpen,
    onClose
}): ReactNode => {
    const {
        theme
    } = useTheme()

    const {
        isVisible,
        isFadingIn
    } = useFadeVisibility(isOpen)

    const [taskName, setTaskName] = useState('TESTTEST')

    return createPortal(
        <Fragment>
            {isVisible
                ? (
                    <div
                        className={`task-modal-background ${isFadingIn ? 'fade-in' : 'fade-out'}`}
                    >
                        <div
                            className={`task-modal-content ${isFadingIn && 'show'}`}
                        >
                            <Row
                                justifyContent={'end'}
                            >
                                <IconButton
                                    onClick={onClose}
                                    backgroundColor={theme.surface}
                                    hoverBackgroundColor={theme.secondary}
                                    hoverColor={theme.primary}
                                >
                                    <CloseIcon/>
                                </IconButton>
                            </Row>
                            <Row>
                                <Column>
                                    <TextField
                                        inputValue={taskName}
                                        setInputValue={setTaskName}
                                        placeholder={'TESTTEST'}
                                    />
                                </Column>
                            </Row>
                        </div>
                    </div>
                )
                : null}
        </Fragment>,
        document.body
    )
}

export default TaskModal
