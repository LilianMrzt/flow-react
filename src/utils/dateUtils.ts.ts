/**
 * Retourne une chaîne comme "Updated today", "Updated X days ago", "Updated X months ago", ou "Updated X years ago"
 * @param dateStr
 */
export const getUpdatedLabel = (dateStr: string | Date): string => {
    const updatedDate = new Date(dateStr)
    const now = new Date()

    const diffTime = now.getTime() - updatedDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 0) {
        return 'Updated today'
    }

    if (diffDays < 30) {
        return `Updated ${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
    }

    const diffMonths = Math.floor(diffDays / 30)
    if (diffMonths < 12) {
        return `Updated ${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`
    }

    const diffYears = Math.floor(diffMonths / 12)
    return `Updated ${diffYears} year${diffYears !== 1 ? 's' : ''} ago`
}
