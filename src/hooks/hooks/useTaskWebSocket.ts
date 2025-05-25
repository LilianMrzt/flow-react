import { useEffect } from 'react'
import { useWebSocket } from '@hooks/contexts/api/WebSocketContext'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { WebSocketEvents } from '@constants/WebSocketEvents'
import { TaskObject } from '@interfaces/objects/api/task/TaskObject'
import { UseTaskWebSocketParams } from '@interfaces/hooks/hooks/UseTaskWebSocketParams'

/**
 * Établit une connexion WebSocket à la room du projet actif pour écouter les événements de création de tâches en temps réel.
 * Lorsqu'une tâche est créée par un autre utilisateur, elle est ajoutée au state local.
 * Nettoie proprement la connexion à la room lors du démontage ou changement de projet.
 */
export const useTaskWebSocket = ({
    tasks,
    setTasks
}: UseTaskWebSocketParams): void => {
    const socket = useWebSocket()
    const {
        loadedProject
    } = useLoadedProject()

    useEffect(() => {
        if (!socket || !loadedProject) return

        socket.emit(WebSocketEvents.JOIN_PROJECT_ROOM, loadedProject.id)

        const handleTaskCreated = (t: TaskObject): void => {
            return setTasks(prev => {
                return [...prev, t]
            })
        }
        const handleTaskDeleted = (id: string): void => {
            return setTasks(prev => {
                return prev.filter(t => {
                    return t.id !== id
                })
            })
        }
        const handleTaskUpdated = (t: TaskObject): void => {
            return setTasks(prev => {
                return prev.map(p => {
                    return (p.id === t.id ? t : p)
                })
            })
        }
        const handleTaskReordered = (updated: TaskObject[]): void => {
            const ids = new Set(updated.map(t => {
                return t.id
            }))
            const rest = tasks.filter(t => {
                return !ids.has(t.id)
            })
            setTasks([...rest, ...updated])
        }

        socket.on(WebSocketEvents.TASK_CREATED, handleTaskCreated)
        socket.on(WebSocketEvents.TASK_DELETED, handleTaskDeleted)
        socket.on(WebSocketEvents.TASK_UPDATED, handleTaskUpdated)
        socket.on(WebSocketEvents.BACKLOG_TASKS_REORDERED, handleTaskReordered)
        socket.on(WebSocketEvents.BOARD_TASKS_REORDERED, handleTaskReordered)

        return (): void => {
            socket.emit(WebSocketEvents.LEAVE_PROJECT_ROOM, loadedProject.key)
            socket.off(WebSocketEvents.TASK_CREATED, handleTaskCreated)
            socket.off(WebSocketEvents.TASK_DELETED, handleTaskDeleted)
            socket.off(WebSocketEvents.TASK_UPDATED, handleTaskUpdated)
            socket.off(WebSocketEvents.BACKLOG_TASKS_REORDERED, handleTaskReordered)
            socket.off(WebSocketEvents.BOARD_TASKS_REORDERED, handleTaskReordered)
        }
    }, [socket, loadedProject, tasks])
}
