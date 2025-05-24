import { useCallback } from 'react'
import { updateColumnTasksOrdersAction } from '@api/TasksApiCalls'
import { UseBoardDragAndDropParams } from '@interfaces/hooks/hooks/UseBoardDragAndDropParams'
import { UseBoardDragAndDropResult } from '@interfaces/hooks/hooks/UseBoardDragAndDropResult'

export const useBoardDragAndDrop = ({
    projectKey,
    columnId,
    tasks,
    hoveredTaskId,
    hoveredPosition,
    setHoveredTaskId,
    setHoveredPosition,
    setDraggedTaskId,
    showAlert,
    setIsDragOver
}: UseBoardDragAndDropParams): UseBoardDragAndDropResult => {

    /**
     * Récupère et trie les tâches appartenant à la colonne actuelle par ordre.
     */
    const getColumnTasks = useCallback(() => {
        return tasks
            .filter(t => {
                return t.column?.id === columnId
            })
            .sort((a, b) => {
                return (a.orderInColumn ?? 0) - (b.orderInColumn ?? 0)
            })
    }, [tasks, columnId])

    /**
     * Gère le drop d'une tâche dans la colonne.
     * Calcule la nouvelle position de la tâche (en tenant compte de son ordre et de la position de survol),
     * puis envoie la nouvelle liste ordonnée au backend.
     */
    const handleDrop = useCallback((taskId: string) => {
        const draggedTask = tasks.find(t => {
            return t.id === taskId
        })
        if (!draggedTask || !projectKey) return

        const columnTasks = getColumnTasks().filter(t => {
            return t.id !== taskId
        })

        let insertIndex = columnTasks.length

        if (hoveredTaskId) {
            const index = columnTasks.findIndex(t => {
                return t.id === hoveredTaskId
            })
            if (index !== -1) {
                insertIndex = hoveredPosition === 'top' ? index : index + 1
            }
        }

        const reordered = [...columnTasks]
        reordered.splice(insertIndex, 0, draggedTask)

        const updates = reordered.map((t, i) => {
            return {
                id: t.id,
                columnId,
                orderInColumn: i
            }
        })

        updateColumnTasksOrdersAction(projectKey, updates).catch(err => {
            showAlert(err.message, 'error')
        })

        setHoveredTaskId(null)
        setHoveredPosition(null)
        setDraggedTaskId(null)
        setIsDragOver(false)
    }, [columnId, getColumnTasks, hoveredTaskId, hoveredPosition, projectKey, setHoveredTaskId, setHoveredPosition, setDraggedTaskId, showAlert, tasks])

    /**
     * Détermine si une ligne d'insertion doit être affichée avant ou après une tâche.
     * Ignore si la tâche survolée est celle qui est en train d'être déplacée.
     */
    const shouldShowLine = useCallback((
        taskId: string,
        previousTaskId: string | undefined,
        draggedTaskId: string | null
    ): boolean => {
        if (hoveredTaskId === draggedTaskId) return false
        return (
            (hoveredTaskId === taskId && hoveredPosition === 'top') ||
            (hoveredTaskId === previousTaskId && hoveredPosition === 'bottom')
        )
    }, [hoveredTaskId, hoveredPosition])

    return {
        handleDrop,
        getColumnTasks,
        shouldShowLine
    }
}
