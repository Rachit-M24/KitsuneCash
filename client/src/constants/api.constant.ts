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
    updateExpense: "/expense",
    deleteExpense: "/expense",
    getExpenseById: "/expense",
  },
  category: {
    getAllCategory: "/category",
    addCategory: "/category",
    updateCategory: "/category",
    deleteCategory: "/category",
    getCategoryById: "/category",
  },
  goal: {
    getAllGoal: "/goal",
    addGoal: "/goal",
    updateGoal: "/goal",
    deleteGoal: "/goal",
    getGoalById: "/goal",
  }
} as const;
