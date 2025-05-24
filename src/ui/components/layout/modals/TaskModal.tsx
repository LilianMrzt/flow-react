import React, { type FC, Fragment, type ReactNode, useEffect, useState } from 'react'
import './task-modal.css'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@resources/Icons'
import { useTheme } from '@hooks/contexts/ThemeContext'
import { handleFadeEffect } from '@utils/AnimationUtils'
import IconButton from '@components/buttons/IconButton'
import { TaskModalProps } from '@interfaces/ui/components/layout/modals/TaskModalProps'
import Row from '@components/layout/Row'

const TaskModal: FC<TaskModalProps> = ({
    isOpen,
    onClose
}): ReactNode => {
    const { theme } = useTheme()

    const [isVisible, setIsVisible] = useState(false)
    const [isFadingIn, setIsFadingIn] = useState(false)

    useEffect(() => {
        handleFadeEffect(isOpen, setIsVisible, setIsFadingIn)
    }, [isOpen])

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
                        </div>
                    </div>
                )
                : null}
        </Fragment>,
        document.body
    )
}

export default TaskModal
