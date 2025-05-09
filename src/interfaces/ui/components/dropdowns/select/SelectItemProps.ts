import { SelectOption } from '@interfaces/objects/front/SelectOption'

export interface SelectItemProps {
    option: SelectOption
    value: string
    onClick: () => void
}
