import { Dispatch, HTMLInputTypeAttribute, ReactElement, SetStateAction } from 'react'

export interface TextFieldProps {
    inputValue: string
    setInputValue: Dispatch<SetStateAction<string>>
    label: string
    placeholder: string
    mandatory?: boolean
    type?: HTMLInputTypeAttribute
    icon?: ReactElement
    name?: string
}
