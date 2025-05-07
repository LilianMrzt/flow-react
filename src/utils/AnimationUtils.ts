import { type Dispatch, type SetStateAction } from 'react'

/**
 * Fonction pour gérer les animations de fade in/out
 * @param isOpen
 * @param setIsVisible
 * @param setIsFadingIn
 */
export const handleFadeEffect = (
    isOpen: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>,
    setIsFadingIn: Dispatch<SetStateAction<boolean>>
) => {
    if (isOpen) {
        setIsVisible(true)
        setTimeout(() => {
            setIsFadingIn(true)
        }, 10)
    } else {
        setIsFadingIn(false)
        const timeout = setTimeout(() => {
            setIsVisible(false)
        }, 150)
        return (): void => {
            clearTimeout(timeout)
        }
    }
}
