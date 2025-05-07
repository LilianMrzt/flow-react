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
import Button from '@components/buttons/Button'

const Modal: FC<ModalProps> = ({
    isOpen,
    setIsOpen,
    children,
    onClose,
    label,
    description,
    buttonContent
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
                            <Row
                                justifyContent={'flex-end'}
                            >
                                <Button
                                    label={'Cancel'}
                                    onClick={() => {
                                        setIsOpen(false)
                                    }}
                                    backgroundColor={theme.surface}
                                    hoverBackgroundColor={theme.secondary}
                                    borderColor={theme.outline}
                                    color={theme.text}
                                    hoverColor={theme.primary}
                                />
                                <Button
                                    label={buttonContent.label}
                                    onClick={buttonContent.onClick}
                                />
                            </Row>
                        </Column>
                    </div>
                )
                : null}
        </Fragment>,
        document.body
    )
}

export default Modal
