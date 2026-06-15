import { authStore } from "@/store/auth.store";

export const useAuth = () => {
  const user = authStore((state) => state.user);
  const isInitializing = authStore((state) => state.isInitializing);
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const actions = authStore((state) => state.actions);

  return {
    user,
    isInitializing,
    isAuthenticated,
    actions,
  };
};