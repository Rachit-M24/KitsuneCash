import { create } from "zustand";

const initialState = {
  User: null,
  acessToken: null,
  isAuthenticated: false,
  isInitializing: false,
};

export const authStore = create((set) => {
  return {
    ...initialState,
    actions: {
      setUser: (user: any) => set({ User: user }),
    },
  };
});
