import { useAuth } from "@/hooks/use-auth";
import { authStore } from "@/store/auth.store";
import { useEffect } from "react";

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { actions } = useAuth();
  const isInitializing = authStore.getState().isInitializing;

  useEffect(() => {
    const init = async () => {
      const token = authStore.getState().accessToken;
      if (!token) {
          await actions.initializeAuth();
      }
    };

    init();
  }, []);

  if (isInitializing) return null;

  return <>{children}</>;
};