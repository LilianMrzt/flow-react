import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { BreadCrumbItemObject } from '@interfaces/objects/front/BreadCrumbItemObject'
import { ProjectDetailsObject } from '@interfaces/objects/api/project/ProjectDetailsObject'

export const PROJECT_DETAILS_BREADCRUMBS = (
    loadedProject: ProjectDetailsObject
): BreadCrumbItemObject[] => {
    return [
        {
            label: ProjectsRoutes.projects.label,
            path: ProjectsRoutes.projects.path
        },
        {
            label: loadedProject.name.charAt(0).toUpperCase() + loadedProject.name.slice(1),
            path: ProjectsRoutes.projectDetails.pathFn!({ key: loadedProject.key })
        }
    ]
}
