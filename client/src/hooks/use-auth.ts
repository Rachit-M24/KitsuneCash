import { authStore } from "@/store/auth.store";

export const useAuth = () => {
  const user = authStore((state) => state.user);
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const actions = authStore((state) => state.actions);

  return {
    user,
    isAuthenticated,
    actions,
  };
};
