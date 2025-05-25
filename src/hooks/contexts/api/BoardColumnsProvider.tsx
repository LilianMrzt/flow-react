import React, { createContext, useContext, useState, type FC } from 'react'
import { BoardColumnObject } from '@interfaces/objects/api/board-column/BoardColumnObject'
import { getColumnsByProjectKeyAction } from '@api/BoardColumnsApiCalls'
import { useAlert } from '@hooks/contexts/AlertContext'
import { useLoadedProject } from '@hooks/contexts/api/LoadedProjectContext'
import { BoardColumnsContextProps } from '@interfaces/hooks/contexts/api/BoardColumnsContextProps'
import { BoardColumnsProviderProps } from '@interfaces/hooks/contexts/api/BoardColumnsProviderProps'

const BoardColumnsContext = createContext<BoardColumnsContextProps | undefined>(undefined)

export const BoardColumnsProvider: FC<BoardColumnsProviderProps> = ({
    children
}) => {
    const {
        loadedProject
    } = useLoadedProject()

    const {
        showAlert
    } = useAlert()

    const [columns, setColumns] = useState<BoardColumnObject[]>([])
    const [hasFetchedOnceColumns, setHasFetchedOnceColumns] = useState(false)

    /**
     * Récupération des colonnes du projet via l'api
     */
    const fetchColumns = async (): Promise<void> => {
        if (!loadedProject || hasFetchedOnceColumns) return

        await getColumnsByProjectKeyAction(loadedProject.key)
            .then((data) => {
                setColumns(data)
            })
            .catch((error) => {
                showAlert(error.message, 'error')
            })
            .finally(() => {
                setTimeout(() => {
                    setHasFetchedOnceColumns(true)
                }, 800) // TODO: retirer le delay
            })
    }

    return (
        <BoardColumnsContext.Provider
            value={{
                columns,
                fetchColumns
            }}
        >
            {children}
        </BoardColumnsContext.Provider>
    )
}

export const useBoardColumns = (): BoardColumnsContextProps => {
    const context = useContext(BoardColumnsContext)
    if (!context) {
        throw new Error('useBoardColumns must be used within a BoardColumnsProvider')
    }
    return context
}
