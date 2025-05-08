import { RouteType } from '@interfaces/types/RouteType'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'
import { AppRoutes } from '@constants/routes/AppRoutes'

export const DrawerRoutes: Record<string, RouteType> = {
    dashboard: AppRoutes.dashboard,
    projects: ProjectsRoutes.projects,
    teams: AppRoutes.teams
}
