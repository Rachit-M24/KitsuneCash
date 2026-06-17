import type { CategoryBudget } from "./categoryBudgetDto.types";
import type { DashboardSummary } from "./dashboardSummary.types";
import type { GoalProgress } from "./goalProgress.types";
import type { TrendsSummary } from "./trendsSummary.types";

export interface DashboardResponse {
  dashboardSummary: DashboardSummary;
  budgetSummary: CategoryBudget[];
  goalSummary: GoalProgress[];
  trendSummary: TrendsSummary;
}