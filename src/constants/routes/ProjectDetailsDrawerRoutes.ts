import { RouteType } from '@interfaces/types/RouteType'
import { ProjectsRoutes } from '@constants/routes/ProjectsRoutes'

export const ProjectDetailsDrawerRoutes: Record<string, RouteType> = {
    projectDetailsDashboard: ProjectsRoutes.projectDetailsDashboard,
    projectDetailsBoard: ProjectsRoutes.projectDetailsBoard,
    projectDetailsBacklog: ProjectsRoutes.projectDetailsBacklog
}
