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
    },
    verifyEmail: {
        label: 'Verify email',
        path: '/auth/verify-email'
    },
    accountCreated: {
        label: 'Account created',
        path: '/auth/account-created'
    }
}
