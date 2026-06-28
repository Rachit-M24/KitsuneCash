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
    getAllBudget: "/budget",
    addBudget: "/budget",
    updateBudget: (id: string) => `/budget/${id}`,
    deleteBudget: (id: string) => `/budget/${id}`,
    getBudgetById: (id: string) => `/budget/${id}`,
  },
  expense: {
    getAllExpense: "/expense",
    addExpense: "/expense",
    updateExpense: (id: string) => `/expense/${id}`,
    deleteExpense: (id: string) => `/expense/${id}`,
    getExpenseById: (id: string) => `/expense/${id}`,
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
