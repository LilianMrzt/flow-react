import React, { type FC, Fragment, type ReactNode } from 'react'
import './modal.css'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@resources/Icons'
import { ModalProps } from '@interfaces/ui/components/layout/modals/ModalProps'
import { useTheme } from '@hooks/contexts/ThemeContext'
import Column from '@components/layout/Column'
import Row from '@components/layout/Row'
import SubTitle from '@components/text/SubTitle'
import IconButton from '@components/buttons/IconButton'
import Text from '@components/text/Text'
import Icon from '@components/resources/Icon'
import { useFadeVisibility } from '@hooks/hooks/useFadeVisibility'

const Modal: FC<ModalProps> = ({
    isOpen,
    children,
    onClose,
    label,
    description,
    icon,
    iconColor,
    titleColor
}): ReactNode => {
    const {
        theme
    } = useTheme()

    const {
        isVisible,
        isFadingIn
    } = useFadeVisibility(isOpen)

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
                                    <Row
                                        justifyContent={'start'}
                                    >
                                        {icon && (
                                            <Icon
                                                size={18}
                                                color={iconColor ?? theme.textSecondary}
                                            >
                                                {icon}
                                            </Icon>
                                        )}
                                        <SubTitle
                                            fontSize={18}
                                            color={titleColor ?? theme.text}
                                        >
                                            {label}
                                        </SubTitle>
                                    </Row>
                                    <IconButton
                                        onClick={onClose}
                                        backgroundColor={theme.surface}
                                        hoverBackgroundColor={theme.secondary}
                                        hoverColor={theme.primary}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                </Row>
                                {description && (
                                    <Text
                                        color={theme.textSecondary}
                                        fontSize={15}
                                    >
                                        {description}
                                    </Text>
                                )}
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
