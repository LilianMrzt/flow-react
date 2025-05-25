import { ProjectDetailsObject } from '@interfaces/objects/api/project/ProjectDetailsObject'

export interface LoadedProjectContextProps {
    loadedProject: ProjectDetailsObject | null
    fetchProject: () => Promise<void>
}
