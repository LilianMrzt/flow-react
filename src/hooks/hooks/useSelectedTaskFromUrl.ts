import { useSearchParams } from 'react-router-dom'

/**
 * Hook pour récupérer une tache depuis l'url
 */
export const useSelectedTaskFromUrl = (): {
    selectedTaskKey: string | null,
    setSelectedTaskKey: (taskKey: string | null) => void
} => {
    const [searchParams, setSearchParams] = useSearchParams()

    const selectedTaskKey = searchParams.get('selectedTask')

    const setSelectedTaskKey = (taskKey: string | null): void => {
        if (taskKey) {
            searchParams.set('selectedTask', taskKey)
        } else {
            searchParams.delete('selectedTask')
        }
        setSearchParams(searchParams, { replace: true })
    }

    return {
        selectedTaskKey,
        setSelectedTaskKey
    }
}
