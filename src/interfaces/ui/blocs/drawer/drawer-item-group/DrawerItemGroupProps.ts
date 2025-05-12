import { RouteType } from '@interfaces/types/RouteType'

export interface DrawerItemGroupProps {
    parentRoute: RouteType
    childrenRoutes: RouteType[]
    isProjectDetails?: boolean
    isDrawerOpen: boolean
}
