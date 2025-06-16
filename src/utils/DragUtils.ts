import { DragEvent, ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import { flushSync } from 'react-dom'

/**
 * Crée une image de drag personnalisée à partir d'un élément div HTML.
 * @param e
 * @param element
 */
export const createDragImageFromElement = (
    e: DragEvent<HTMLDivElement>,
    element: HTMLDivElement | null
): void => {
    if (!e.dataTransfer) return
    if (!element) return

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

/**
 * Crée une image de drag personnalisée à partir d'un composant React.
 * @param e
 * @param element
 * @param offsetX
 * @param offsetY
 */
export const createDragImageFromComponent = (
    e: DragEvent,
    element: ReactNode,
    offsetX = 0,
    offsetY = 0
): void => {
    const dragGhost = document.createElement('div')

    dragGhost.style.position = 'absolute'
    dragGhost.style.top = '-1000px'
    dragGhost.style.left = '-1000px'
    dragGhost.style.zIndex = '9999'

    document.body.appendChild(dragGhost)

    const root = ReactDOM.createRoot(dragGhost)

    flushSync(() => {
        root.render(element)
    })

    e.dataTransfer.setDragImage(dragGhost, offsetX, offsetY)

    setTimeout(() => {
        root.unmount()
        dragGhost.remove()
    }, 3000)
}
