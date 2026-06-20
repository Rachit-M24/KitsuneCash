export const AUTH_ROUTES = {
  login: "/auth/login",
  register: "/auth/register",
  forgotPassword: "/auth/forgot-password",
} as const;

export const APP_ROUTES = {
  dashboard: "/dashboard",
  budget: "/budget",
  expense: "/expense",
  category: "/category",
  goal: "/goal",
  settings: "/settings",
} as const;
