import { Dispatch, SetStateAction } from 'react'

export interface TextFieldProps {
    inputValue: string
    setInputValue: Dispatch<SetStateAction<string>>
    label: string
    placeholder: string
}
