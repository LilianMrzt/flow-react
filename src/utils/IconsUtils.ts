import { CSSProperties, ReactElement } from 'react'
import { SelectOption } from '@interfaces/objects/front/SelectOption'

/**
 * Récupérer l'icône d'une valeur de selection issue d'un dropdown
 * @param field
 * @param array
 */
export const getSelectionFieldIcon = (
    field: string,
    array: SelectOption[]
): ReactElement | null => {
    return array.find(opt => {
        return opt.value === field
    })?.icon ?? null
}

/**
 * Récupérer la couleur de l'icône d'une valeur de selection issue d'un dropdown
 * @param field
 * @param array
 */
export const getSelectionFieldColor = (
    field: string,
    array: SelectOption[]
): CSSProperties['color'] => {
    return array.find(opt => {
        return opt.value === field
    })?.iconColor ?? 'inherit'
}
