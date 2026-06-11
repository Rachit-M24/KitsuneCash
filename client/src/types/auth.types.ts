export type AiAssistantStatus = "active" | "inactive";

export interface User {
  id: string;
  email: string;
  username: string;
  aiAssistantName: string;
  aiAssistantStatus: AiAssistantStatus;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface ForgotPasswordPayload {
  email: string;
}
