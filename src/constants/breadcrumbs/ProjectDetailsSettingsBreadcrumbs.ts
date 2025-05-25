import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { BreadCrumbItemObject } from '@interfaces/objects/front/BreadCrumbItemObject'
import { PROJECT_DETAILS_BREADCRUMBS } from '@constants/breadcrumbs/ProjectDetailsBreadcrumbs'
import { ProjectObject } from '@interfaces/objects/api/project/ProjectObject'

export const PROJECT_DETAILS_SETTINGS_BREADCRUMBS = (
    loadedProject: ProjectObject
): BreadCrumbItemObject[] => {
    return [
        ...PROJECT_DETAILS_BREADCRUMBS(loadedProject),
        {
            label: ProjectsRoutes.projectDetailsSettings.label,
            path: ProjectsRoutes.projectDetailsSettings.pathFn!({ key: loadedProject.key })
        }
    ]
}
