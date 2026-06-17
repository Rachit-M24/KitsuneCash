import type { GoalProgress } from "./goalProgress.types";

export interface DashboardSummary {
  totalSpent: number;
  totalBudget: number;
  totalRemaining: number;
  activeGoals: GoalProgress[];
}