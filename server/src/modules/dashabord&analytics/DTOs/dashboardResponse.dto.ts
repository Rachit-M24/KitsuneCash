import { CategoryBudgetDto } from "./categoryBudget.dto.js";
import { DashboardSummaryDto } from "./dashboardSummary.dto.js";
import { GoalProgressDto } from "./goalProgress.dto.js";
import { TrendsSummaryDto } from "./trends.dto.js";

export interface DashboardResponseDto {
  dashboardSummary: DashboardSummaryDto;
  budgetSummary: CategoryBudgetDto[];
  goalSummary: GoalProgressDto[];
  trendSummary: TrendsSummaryDto;
}