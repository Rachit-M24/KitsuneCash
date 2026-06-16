import { useAuth } from "@/hooks/use-auth";
import { Loader } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

export function AuthLayout() {
  const { isAuthenticated, isInitializing } = useAuth();
  const navigate = useNavigate();

  if (isInitializing) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    navigate("/");
  }
  return (
    <>
      <Outlet />
    </>
  );
}
