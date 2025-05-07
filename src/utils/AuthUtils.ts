import { StorageConstants } from '@constants/StorageConstants'

export const isTokenValid = (): string | null => {
    return sessionStorage.getItem(StorageConstants.token)
}
