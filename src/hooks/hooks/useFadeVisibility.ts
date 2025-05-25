import { useEffect, useState } from 'react'

/**
 * Hook pour gérer une visibilité avec fade in/out
 * @param isOpen
 * @param duration
 */
export const useFadeVisibility = (
    isOpen: boolean,
    duration = 150
): { isVisible: boolean; isFadingIn: boolean } => {
    const [isVisible, setIsVisible] = useState(false)
    const [isFadingIn, setIsFadingIn] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            const timeout = setTimeout(() => {
                setIsFadingIn(true)
            }, 10)
            return (): void => {
                clearTimeout(timeout)
            }
        } else {
            setIsFadingIn(false)
            const timeout = setTimeout(() => {
                setIsVisible(false)
            }, duration)
            return (): void => {
                clearTimeout(timeout)
            }
        }
    }, [isOpen, duration])

    return {
        isVisible,
        isFadingIn
    }
}
