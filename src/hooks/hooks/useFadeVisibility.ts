import { useEffect, useState } from 'react'

/**
 * Hook pour gérer une visibilité avec fade in/out
 * @param isOpen Indique si le composant est censé être visible
 * @param duration Durée en ms de l’animation
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
                return clearTimeout(timeout)
            }
        } else {
            setIsFadingIn(false)
            const timeout = setTimeout(() => {
                setIsVisible(false)
            }, duration)
            return (): void => {
                return clearTimeout(timeout)
            }
        }
    }, [isOpen, duration])

    return { isVisible, isFadingIn }
}
