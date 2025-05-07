import React, { createContext, useContext, useState, type FC } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { type AlertObject } from '@interfaces/objects/front/AlertObject'
import { AlertType } from '@interfaces/types/AlertType'
import Alert from '@components/dialogs/Alert'
import { AlertContextProps } from '@interfaces/hooks/contexts/AlertContextProps'
import { AlertProviderProps } from '@interfaces/hooks/contexts/AlertProviderProps'

const AlertContext = createContext<AlertContextProps | undefined>(undefined)

export const AlertProvider: FC<AlertProviderProps> = ({
    children
}) => {
    const [alerts, setAlerts] = useState<AlertObject[]>([])

    /**
     * Fonction pour montrer une alerte
     * @param message
     * @param type
     */
    const showAlert = (message: string, type: AlertType): void => {
        const id = uuidv4()
        setAlerts((prev) => {
            const next = [...prev, { id, message, open: true, type }]
            return next.length > 2 ? next.slice(1) : next
        })

        setTimeout(() => {
            setAlerts((prev) => {
                return prev.map((a) => {
                    return a.id === id ? { ...a, open: false } : a
                })
            }
            )
            setTimeout(() => {
                setAlerts((prev) => {
                    return prev.filter((a) => {
                        return a.id !== id
                    })
                })
            }, 150)
        }, 3000)
    }

    /**
     * Fonction pour calculer l'offset de la derniere alerte
     * @param id
     */
    const calculateOffset = (id: string): number => {
        const reversed = [...alerts].reverse()
        let offset = 24

        for (const alert of reversed) {
            if (alert.id === id) break
            offset += (alert.height ?? 0) + 16
        }

        return offset
    }

    /**
     * Calculer la hauteur des alertes
     * @param height
     * @param alert
     */
    const calculateAlertHeight = (height: number, alert: AlertObject): void => {
        setAlerts((prev) => {
            return prev.map((a) => {
                return a.id === alert.id ? { ...a, height } : a
            })
        }
        )
    }

    return (
        <AlertContext.Provider
            value={{
                showAlert
            }}
        >
            {children}
            {[...alerts].reverse().map((alert) => {
                return (
                    <Alert
                        key={alert.id}
                        open={alert.open}
                        message={alert.message}
                        type={alert.type}
                        offset={calculateOffset(alert.id)}
                        onHeight={(height) => {
                            calculateAlertHeight(height, alert)
                        }}
                    />
                )
            })}
        </AlertContext.Provider>
    )
}

export const useAlert = (): AlertContextProps => {
    const context = useContext(AlertContext)
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider')
    }
    return context
}
