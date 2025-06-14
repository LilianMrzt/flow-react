import React, { type FC, type ReactNode, Fragment, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './alert.css'
import { getAlertBackgroundColor, getAlertColor, getAlertIcon } from '@utils/AlertUtils'
import { AlertProps } from '@interfaces/ui/components/dialogs/AlertProps'
import Row from '@components/layout/Row'
import Icon from '@components/resources/Icon'
import Text from '@components/text/Text'
import { useFadeVisibility } from '@hooks/hooks/useFadeVisibility'

const Alert: FC<AlertProps> = ({
    open,
    message,
    offset,
    onHeight,
    type
}): ReactNode => {
    const ref = useRef<HTMLDivElement | null>(null)
    const hasSentHeight = useRef<number | null>(null)

    const {
        isVisible,
        isFadingIn
    } = useFadeVisibility(open)

    /**
     * Récupère la hauteur du composant
     */
    useLayoutEffect(() => {
        if (isVisible && ref.current && onHeight) {
            const height = ref.current?.getBoundingClientRect().height
            if (hasSentHeight.current !== height) {
                hasSentHeight.current = height
                onHeight(height)
            }
        }
    }, [isVisible, onHeight])

    return createPortal(
        <Fragment>
            {isVisible
                ? (
                    <div
                        ref={ref}
                        className={`dialog-alert-container ${isFadingIn ? 'fade-in' : 'fade-out'}`}
                        style={{
                            top: offset,
                            backgroundColor: getAlertBackgroundColor(type)
                        }}
                    >
                        <Row
                            className={'dialog-alert-content'}
                            justifyContent={'start'}
                        >
                            <Icon
                                color={getAlertColor(type)}
                            >
                                {getAlertIcon(type)}
                            </Icon>
                            <Text
                                color={getAlertColor(type)}
                                maxLines={5}
                            >
                                {message}
                            </Text>
                        </Row>
                    </div>
                )
                : null}
        </Fragment>,
        document.body
    )
}

export default Alert
