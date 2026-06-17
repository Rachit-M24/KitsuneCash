import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/LandingPage/HomePage";
import { authRoutes } from "./auth.routes";
import ProtectedRoute from "@/utils/ProtectedRoutes";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      authRoutes,
    ],
  },
  {
    path:"/dashboard",
    element: <ProtectedRoute><div>Dashboard</div></ProtectedRoute>
  }
];
