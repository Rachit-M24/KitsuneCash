import { logIn, logOut, register } from "@/api/auth.api";
import type { AuthResponse } from "@/types/auth.types";
import type { User } from "@/types/User";
import { create } from "zustand";

type UserLogInPayload = {
  email: string;
  password: string;
};

type UserRegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
};

interface AuthActions {
  logIn: (credentials: UserLogInPayload) => void;
  logOut: () => void;
  register: (credentials: UserRegisterPayload) => void;
}

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  User: {};
  actions: AuthActions;
}

const initialState = {
  User: {},
  accessToken: null,
  isAuthenticated: false,
  isInitializing: false,
};

export const authStore = create<AuthState>((set) => {
  return {
    ...initialState,
    actions: {
      logIn: async(userCredentials: UserLogInPayload) => {
        const result = await logIn(userCredentials);
        set({
          User: result.data.user,
          accessToken: result.data.accessToken,
          isAuthenticated: true,
        });
      },
      logOut: async () => {
        await logOut();
        set({
          User: {},
          accessToken: null,
          isAuthenticated: false,
        });
      },
      register: async (userCredentials: UserRegisterPayload) => {
         const result = await register(userCredentials);
         set({
           User: result.data.user,
           accessToken: result.data.accessToken,
           isAuthenticated: true,
         });
      }
    },
  };
});