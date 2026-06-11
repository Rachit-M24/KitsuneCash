import { AuthLayout } from "@/components/auth/AuthLayout";
import { ForgotPasswordPage } from "@/pages/Auth/ForgotPasswordPage";
import { LoginPage } from "@/pages/Auth/LoginPage";
import { RegisterPage } from "@/pages/Auth/RegisterPage";

export const authRoutes = {
  path: "auth",
  element: <AuthLayout />,
  children: [
    { path: "login", element: <LoginPage /> },
    { path: "register", element: <RegisterPage /> },
    { path: "forgot-password", element: <ForgotPasswordPage /> },
  ],
};
