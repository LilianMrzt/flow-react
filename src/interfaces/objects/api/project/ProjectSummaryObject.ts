import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'

export interface ProjectSummaryObject extends Omit<ProjectObject, 'columns' | 'tasks' | 'members'> {}
