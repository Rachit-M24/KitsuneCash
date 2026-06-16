import { create } from "zustand";
import {
  logIn as logInApi,
  logOut as logOutApi,
  register as registerApi,
} from "@/api/auth.api";
import type {
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/types/auth.types";
import { refreshSession } from "@/api/refresh.api";

interface AuthActions {
  logIn: (credentials: LoginCredentials) => Promise<void>;
  logOut: () => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  refreshToken: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  actions: AuthActions;
}

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isInitializing: true,
};

export const authStore = create<AuthState>((set) => ({
  ...initialState,
  actions: {
    logIn: async (credentials) => {
      const result = await logInApi(credentials);
      set({
        user: result.data.user,
        accessToken: result.data.accessToken,
        isInitializing: false,
        isAuthenticated: true,
      });
    },
    logOut: async () => {
      await logOutApi();
      set({
        user: null,
        accessToken: null,
        isInitializing: false,
        isAuthenticated: false,
      });
    },
    register: async (credentials) => {
      const { confirmPassword: _, ...payload } = credentials;
      const result = await registerApi(payload);
      set({
        user: result.data.user,
        accessToken: result.data.accessToken,
        isInitializing: false,
        isAuthenticated: true,
      });
    },

    refreshToken: async () => {
      const result = await refreshSession();
      set({
        user: result.data.user,
        accessToken: result.data.accessToken,
        isAuthenticated: true,
        isInitializing: false,
      });
    },

    initializeAuth: async () => {
      try {
        const result = await refreshSession();
        set({
          user: result.data.user,
          accessToken: result.data.accessToken,
          isAuthenticated: true,
          isInitializing: false,
        });
      } catch (error) {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isInitializing: false,
        });
      }
    },
  },
}));
