import { SelectOption } from '@interfaces/objects/front/SelectOption'

export interface SelectProps {
    label: string
    value: string
    onChange: (value: string) => void
    options: SelectOption[]
}
