import React, { DragEvent, useCallback } from 'react'
import { updateBacklogTasksOrdersAction } from '@api/TasksApiCalls'
import { createDragImageFromComponent } from '@utils/DragUtils'
import { UseBacklogDragAndDropParams } from '@interfaces/hooks/hooks/UseBacklogDragAndDropParams'
import { UseBacklogDragAndDropResult } from '@interfaces/hooks/hooks/UseBacklogDragAndDropResult'
import BacklogTaskDragImage from '@ui/blocs/drag-images/BacklogTaskDragImage'

export const useBacklogDragAndDrop = ({
    task,
    sortedBacklogTasks,
    projectSlug,
    setDraggedTaskId,
    setHoveredLineId,
    setHoveredLinePosition,
    hoveredLinePosition,
    showAlert,
    taskRef
}: UseBacklogDragAndDropParams): UseBacklogDragAndDropResult => {
    /**
     * Débute le drag de la tâche et configure l'image fantôme.
     */
    const handleDragStart = useCallback((e: DragEvent<HTMLDivElement>): void => {
        e.dataTransfer.setData('text/plain', task.id)
        setDraggedTaskId(task.id)

        const previewWidth = 250
        const previewHeight = 40

        createDragImageFromComponent(
            e,
            <BacklogTaskDragImage
                task={task}
                width={previewWidth}
                height={previewHeight}
            />,
            previewWidth / 2,
            previewHeight / 2
        )
    }, [task.id, task.title, task.priority, task.type, setDraggedTaskId, taskRef])

    /**
     * Termine le drag.
     */
    const handleOnDragEnd = useCallback((): void => {
        setDraggedTaskId(null)
    }, [setDraggedTaskId])

    /**
     * Gère le drop de la tâche à la nouvelle position dans le backlog.
     */
    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault()
        const draggedId = e.dataTransfer.getData('text/plain')
        if (!draggedId || draggedId === task.id || hoveredLinePosition === null) {
            setHoveredLineId(null)
            setHoveredLinePosition(null)
            return
        }

        const draggedIndex = sortedBacklogTasks.findIndex(t => {
            return t.id === draggedId
        })
        const targetIndex = sortedBacklogTasks.findIndex(t => {
            return t.id === task.id
        })
        if (draggedIndex === -1 || targetIndex === -1) return

        const reordered = [...sortedBacklogTasks]
        const [movedTask] = reordered.splice(draggedIndex, 1)
        const insertIndex =
            hoveredLinePosition === 'top'
                ? targetIndex > draggedIndex ? targetIndex - 1 : targetIndex
                : targetIndex > draggedIndex ? targetIndex : targetIndex + 1

        reordered.splice(insertIndex, 0, movedTask)

        const updates = reordered.map((t, i) => {
            return {
                id: t.id,
                orderInBacklog: i
            }
        }).filter((u, i) => {
            return (
                sortedBacklogTasks[i].id !== u.id || sortedBacklogTasks[i].orderInBacklog !== i
            )
        })

        updateBacklogTasksOrdersAction(projectSlug, updates).catch(err => {
            showAlert(err.message, 'error')
        })

        setHoveredLineId(null)
        setHoveredLinePosition(null)
    }, [task.id, hoveredLinePosition, sortedBacklogTasks, projectSlug, setHoveredLineId, setHoveredLinePosition, showAlert])

    /**
     * Gère le survol d'une tâche pendant le drag pour déterminer si on est au-dessus ou en dessous.
     */
    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault()
        const rect = e.currentTarget.getBoundingClientRect()
        const isTop = e.clientY <= rect.top + rect.height / 2
        setHoveredLineId(task.id)
        setHoveredLinePosition(isTop ? 'top' : 'bottom')
    }, [task.id, setHoveredLineId, setHoveredLinePosition])

    /**
     * Réinitialise les lignes d'insertion quand on sort du survol en drag.
     */
    const handleDragLeave = useCallback((): void => {
        setHoveredLineId(null)
        setHoveredLinePosition(null)
    }, [setHoveredLineId, setHoveredLinePosition])

    return {
        handleDragStart,
        handleOnDragEnd,
        handleDrop,
        handleDragOver,
        handleDragLeave
    }
}
