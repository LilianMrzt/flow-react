import { RouteType } from '@interfaces/types/RouteType'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'

export const ProjectDetailsSettingsRoutes: Record<string, RouteType> = {
    projectDetailsSettingsDetails: ProjectsRoutes.projectDetailsSettingsDetails,
    projectDetailsSettingsAccess: ProjectsRoutes.projectDetailsSettingsAccess,
    projectDetailsSettingsBoard: ProjectsRoutes.projectDetailsSettingsBoard,
    projectDetailsSettingsWorkflow: ProjectsRoutes.projectDetailsSettingsWorkflow,
    projectDetailsSettingsDangerZone: ProjectsRoutes.projectDetailsSettingsDangerZone
}
