import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { authRoutes } from "./auth.routes";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      authRoutes,
    ],
  },
];
