import { Dispatch, SetStateAction } from 'react'

export interface TextAreaProps {
    inputValue: string
    setInputValue: Dispatch<SetStateAction<string>>
    label: string
    placeholder: string
}
