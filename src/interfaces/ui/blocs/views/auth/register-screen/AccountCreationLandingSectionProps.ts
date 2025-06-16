import { Dispatch, SetStateAction } from 'react'

export interface AccountCreationLandingSectionProps {
    email: string
    setEmail: Dispatch<SetStateAction<string>>
    setIsManualAccountCreationInformationsVisible: Dispatch<SetStateAction<boolean>>
}
