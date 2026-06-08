import { logIn, logOut, register } from "@/api/auth.api";
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
  User: null;
  actions: AuthActions;
}

const initialState = {
  User: null,
  accessToken: null,
  isAuthenticated: false,
  isInitializing: false,
};

export const authStore = create<AuthState>((set) => {
  return {
    ...initialState,
    actions: {
      logIn: (userCredentials: UserLogInPayload) => {
        const result = logIn(userCredentials);
        set({
          User: result.user,
          accessToken: result.accessToken,
          isAuthenticated: true,
        });
      },
      logOut: () => {
        logOut();
        set({
          User: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },
      register: (userCredentials: UserRegisterPayload) => {
         const result = register(userCredentials);
         set({
           User: result.user,
           accessToken: result.accessToken,
           isAuthenticated: true,
         });
      }
    },
  };
});
