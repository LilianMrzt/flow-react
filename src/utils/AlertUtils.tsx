import React, { type ReactElement } from 'react'
import { ErrorIcon, SuccessIcon, WarningIcon } from '@resources/Icons'
import AlertColors from '@constants/themes/AlertColors'
import { AlertType } from '@interfaces/types/AlertType'

/**
 * Récupération de la couleur de background de l'alerte
 * @param type
 */
export const getAlertBackgroundColor = (
    type: AlertType
): string => {
    if (type === 'warning') return AlertColors.yellow
    else if (type === 'error') return AlertColors.red
    else return AlertColors.green
}

/**
 * Récupération de la couleur de l'alerte
 * @param type
 */
export const getAlertColor = (
    type: AlertType
): string => {
    if (type === 'warning') return AlertColors.onYellow
    else if (type === 'error') return AlertColors.onRed
    else return AlertColors.onGreen
}

/**
 * Récupération de l'icone de l'alerte
 * @param type
 */
export const getAlertIcon = (
    type: AlertType
): ReactElement => {
    if (type === 'warning') return <WarningIcon/>
    else if (type === 'error') return <ErrorIcon/>
    else return <SuccessIcon/>
}
