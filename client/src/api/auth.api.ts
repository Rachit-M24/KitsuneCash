import api from "@/api/axios";
import { API_PATHS } from "@/constants/api.constant";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "@/types/auth.types";

export const logIn = async (credentials: LoginCredentials) => {
  return api.post<AuthResponse>(API_PATHS.auth.login, credentials);
};

export const register = async (
  credentials: Omit<RegisterCredentials, "confirmPassword">,
) => {
  const { username, email, password } = credentials;
  return api.post<AuthResponse>(API_PATHS.auth.register, {
    username,
    email,
    password,
  });
};

export const logOut = async () => {
  return api.post(API_PATHS.auth.logout);
};

export const forgotPassword = async (email: string) => {
  return api.post(API_PATHS.auth.forgotPassword, { email });
};
