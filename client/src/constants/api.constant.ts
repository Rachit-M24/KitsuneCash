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
  budget: {
    getAllBudget: "/budgets",
    addBudget: "/budgets",
    updateBudget: (id: string) => `/budgets/${id}`,
    deleteBudget: (id: string) => `/budgets/${id}`,
    getBudgetById: (id: string) => `/budgets/${id}`,
  },
  expense: {
    getAllExpense: "/expenses",
    addExpense: "/expenses",
    updateExpense: (id: string) => `/expenses/${id}`,
    deleteExpense: (id: string) => `/expenses/${id}`,
    getExpenseById: (id: string) => `/expenses/${id}`,
  },
  category: {
    getAllCategory: "/categories",
    addCategory: "/categories",
    updateCategory: (id: string) => `/categories/${id}`,
    deleteCategory: (id: string) => `/categories/${id}`,
    getCategoryById: (id: string) => `/categories/${id}`,
  },
  goal: {
    getAllGoal: "/goal",
    addGoal: "/goal",
    updateGoal: "/goal",
    deleteGoal: "/goal",
    getGoalById: "/goal",
  }
} as const;
