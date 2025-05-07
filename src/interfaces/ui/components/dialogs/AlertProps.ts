import { AlertType } from '@interfaces/types/AlertType'

export interface AlertProps {
    open: boolean
    message: string
    onHeight?: (height: number) => void
    offset: number
    type: AlertType
}
