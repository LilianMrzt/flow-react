import { AlertType } from '@interfaces/types/AlertType'

export interface AlertContextProps {
    showAlert: (message: string, type: AlertType) => void
}
