import { StorageConstants } from '@constants/StorageConstants'

export const isTokenValid = (): string | null => {
    return localStorage.getItem(StorageConstants.token)
}

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}
