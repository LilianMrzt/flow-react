import { SelectOption } from '@interfaces/objects/front/SelectOption'
import { CSSProperties } from 'react'

export interface SelectProps {
    label?: string
    value: string
    onChange: (value: string) => void
    options: SelectOption[]
    backgroundColor?: CSSProperties['backgroundColor']
    borderColor?: CSSProperties['borderColor']
}
