import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'

export interface ProjectContextProps {
    projects: ProjectObject[]
    createProjectStateUpdate: (newProject: ProjectObject) => void
    getProjectsStateUpdate: (projects: ProjectObject[]) => void
}
