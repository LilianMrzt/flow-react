import { RefObject, useEffect } from 'react'

/**
 * Gestion d'un click en dehors d'un ou plusieurs éléments
 * @param refs Tableau de références à écouter
 * @param onClickOutside Callback si clic à l'extérieur
 * @param shouldTrigger Activation du comportement
 */
export const useClickOutside = (
    refs: RefObject<HTMLElement | null>[],
    onClickOutside: () => void,
    shouldTrigger: boolean = true
): void => {
    useEffect(() => {
        if (!shouldTrigger) return

        const handleClick = (event: MouseEvent): void => {
            const isInside = refs.some(ref => {
                return ref.current?.contains(event.target as Node)
            })
            if (!isInside) {
                onClickOutside()
            }
        }

        document.addEventListener('mousedown', handleClick)
        return (): void => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [refs, onClickOutside, shouldTrigger])
}
