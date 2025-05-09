import { DragEvent } from 'react'

/**
 * Crée une image de drag personnalisée à partir d'un élément div HTML.
 * @param e
 * @param element
 */
export const createDragImageFromElement = (
    e: DragEvent<HTMLDivElement>,
    element: HTMLDivElement
): void => {
    if (!e.dataTransfer) return

    const rect = element.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    const clone = element.cloneNode(true) as HTMLElement
    const computedStyle = window.getComputedStyle(element)

    for (const prop of computedStyle) {
        clone.style.setProperty(
            prop,
            computedStyle.getPropertyValue(prop),
            computedStyle.getPropertyPriority(prop)
        )
    }

    clone.style.position = 'absolute'
    clone.style.top = '-9999px'
    clone.style.left = '-9999px'
    clone.style.zIndex = '9999'
    clone.style.pointerEvents = 'none'

    document.body.appendChild(clone)
    e.dataTransfer.setDragImage(clone, offsetX, offsetY)

    setTimeout(() => {
        document.body.removeChild(clone)
    }, 0)
}
