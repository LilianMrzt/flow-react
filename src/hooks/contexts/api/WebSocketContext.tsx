import React, { createContext, useContext, useEffect } from 'react'
import { socket } from '@api/ws/socket'
import type { Socket } from 'socket.io-client'
import { WebSocketProviderProps } from '@interfaces/hooks/contexts/api/WebSocketProviderProps'

const WebSocketContext = createContext<Socket | null>(null)

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
    children
}) => {
    useEffect(() => {
        socket.connect()

        return (): void => {
            socket.disconnect()
        }
    }, [])

    return (
        <WebSocketContext.Provider
            value={socket}
        >
            {children}
        </WebSocketContext.Provider>
    )
}

export const useWebSocket = (): Socket => {
    const context = useContext(WebSocketContext)
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider')
    }
    return context
}
