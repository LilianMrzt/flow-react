import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'

export interface ProjectDetailsObject extends Omit<ProjectObject, 'tasks' | 'columns'> {}
