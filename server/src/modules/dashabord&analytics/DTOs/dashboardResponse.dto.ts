import categoryBudgetDto from "./categoryBudget.dto.js";
import dashboardSummaryDto from "./dashboardSummary.dto.js";
import goalProgressDto from "./goalProgress.dto.js";
import trendsSummaryDto from "./trends.dto.js";

 const dashboardResponseDto = {
    dashboardSummary : dashboardSummaryDto,
    budgetSummary: categoryBudgetDto,
    goalSummary: goalProgressDto,
    TrendSummary: trendsSummaryDto
  };

  export type DashboardResponseDto = typeof dashboardResponseDto;