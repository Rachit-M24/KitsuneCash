export const API_PATHS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    forgotPassword: "/auth/forgot-password",
  },
  dashbaord: {
    getDashboardData: "/dashboard",
  },
} as const;
