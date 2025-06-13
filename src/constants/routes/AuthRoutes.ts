import { RouteType } from '@interfaces/types/RouteType'

export const AuthRoutes: Record<string, RouteType> = {
    signIn: {
        label: 'Sign in',
        path: '/auth'
    },
    register: {
        label: 'Register',
        path: '/register'
    },
    forgotPassword: {
        label: 'Forgot password',
        path: '/auth/forgot-password'
    },
    resetPassword: {
        label: 'Reset password',
        path: '/auth/reset-password'
    }
}
