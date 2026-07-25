import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/LandingPage/HomePage";
import { DashboardPage } from "@/pages/Dashboard/DashboardPage";
import { authRoutes } from "./auth.routes";
import ProtectedRoute from "@/utils/ProtectedRoutes";
import CategoryPage from "@/pages/category/CategoryPage";
import ExpensePage from "@/pages/Expense/ExpensePage";
import BudgetPage from "@/pages/Budget/BudgetPage";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }, authRoutes],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/budget",
    element: (
      <ProtectedRoute>
        <BudgetPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/expense",
    element: (
      <ProtectedRoute>
        <ExpensePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/category",
    element: (
      <ProtectedRoute>
        <CategoryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/goal",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
];
