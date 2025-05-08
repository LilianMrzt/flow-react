import { RefObject, useEffect } from 'react'

/**
 * Gestion d'un click en dehors d'un composant
 * @param ref
 * @param onClickOutside
 */
export const useClickOutside = (
    ref: RefObject<HTMLElement | null>,
    onClickOutside: () => void
): void => {
    useEffect(() => {
        const handleClick = (event: MouseEvent): void => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside()
            }
        }

        document.addEventListener('mousedown', handleClick)
        return (): void => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [ref, onClickOutside])
}
