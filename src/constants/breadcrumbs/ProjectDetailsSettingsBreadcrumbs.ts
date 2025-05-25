import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { BreadCrumbItemObject } from '@interfaces/objects/front/BreadCrumbItemObject'
import { PROJECT_DETAILS_BREADCRUMBS } from '@constants/breadcrumbs/ProjectDetailsBreadcrumbs'
import { ProjectDetailsObject } from '@interfaces/objects/api/project/ProjectDetailsObject'

export const PROJECT_DETAILS_SETTINGS_BREADCRUMBS = (
    loadedProject: ProjectDetailsObject
): BreadCrumbItemObject[] => {
    return [
        ...PROJECT_DETAILS_BREADCRUMBS(loadedProject),
        {
            label: ProjectsRoutes.projectDetailsSettings.label,
            path: ProjectsRoutes.projectDetailsSettings.pathFn!({ key: loadedProject.key })
        }
    ]
}
