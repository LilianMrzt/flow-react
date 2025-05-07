import { StorageConstants } from '@constants/StorageConstants'

export const isTokenValid = (): string | null => {
    return localStorage.getItem(StorageConstants.token)
}
