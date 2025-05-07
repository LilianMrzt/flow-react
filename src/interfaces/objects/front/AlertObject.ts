import { AlertType } from '@interfaces/types/AlertType'

export interface AlertObject {
    id: string
    message: string
    height?: number
    open: boolean
    type: AlertType
}
