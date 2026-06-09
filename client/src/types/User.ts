export type AiAssistantStatus = "active" | "inactive";

export interface User {
  id: string;
  email: string;
  username: string;
  aiAssistantName: string;
  aiAssistantStatus: AiAssistantStatus;
}