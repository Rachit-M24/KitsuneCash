import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  console.log("ProtectedRoute: isAuthenticated =", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={{pathname: "/auth/login"}} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
