import { GoalProgressDto } from "./goalProgress.dto.js";

export interface DashboardSummaryDto {
  totalSpent: number;
  totalBudget: number;
  totalRemaining: number;
  activeGoals: GoalProgressDto[];
}