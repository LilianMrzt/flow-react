import { Dispatch, SetStateAction } from 'react'

export interface ManualAccountCreationSectionProps {
    email: string
    setIsManualAccountCreationInformationsVisible: Dispatch<SetStateAction<boolean>>
}
