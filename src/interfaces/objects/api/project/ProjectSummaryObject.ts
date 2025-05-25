import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'

export type ProjectSummaryObject = Omit<
    ProjectObject,
    'columns' | 'tasks' | 'members'
> & {
    totalTasksNumber: number
}
