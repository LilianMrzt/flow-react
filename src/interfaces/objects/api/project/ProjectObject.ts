import { ProjectMemberObject } from '@interfaces/objects/api/project/ProjectMemberObject'

export interface ProjectObject {
    id: string
    name: string
    description?: string
    key: string
    totalTasksNumber: number
    members: ProjectMemberObject[]
    createdAt: string
    updatedAt: string
}
