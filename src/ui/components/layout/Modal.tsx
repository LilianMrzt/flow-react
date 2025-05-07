import React, { type FC, Fragment, type ReactNode, useEffect, useState } from 'react'
import './modal.css'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@resources/Icons'
import { ModalProps } from '@interfaces/ui/components/layout/ModalProps'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Column from '@components/layout/Column'
import Row from '@components/layout/Row'
import SubTitle from '@components/text/SubTitle'
import { handleFadeEffect } from '@utils/AnimationUtils'
import IconButton from '@components/buttons/IconButton'
import Text from '@components/text/Text'

const Modal: FC<ModalProps> = ({
    isOpen,
    children,
    onClose,
    label,
    description
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
                        className={`modal-background ${isFadingIn ? 'fade-in' : 'fade-out'}`}
                    >
                        <Column
                            className={`modal-content ${isFadingIn && 'show'}`}
                            height={'fit-content'}
                            alignItems={'start'}
                            gap={16}
                        >
                            <Column
                                alignItems={'start'}
                                gap={4}
                            >
                                <Row
                                    width={'100%'}
                                    justifyContent={'space-between'}
                                >
                                    <SubTitle
                                        fontSize={18}
                                    >
                                        {label}
                                    </SubTitle>
                                    <IconButton
                                        onClick={onClose}
                                        backgroundColor={theme.surface}
                                        hoverBackgroundColor={theme.secondary}
                                        hoverColor={theme.primary}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                </Row>
                                <Text
                                    color={theme.textSecondary}
                                    fontSize={15}
                                >
                                    {description}
                                </Text>
                            </Column>
                            {children}
                        </Column>
                    </div>
                )
                : null}
        </Fragment>,
        document.body
    )
}

export default Modal
