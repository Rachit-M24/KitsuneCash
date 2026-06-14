import { asyncHandler } from "../../middleware/asyncHandler.js";
import { dashboardService } from "./dashboard.service.js";

export const getDashboardData = asyncHandler(async (req, res) => {
  const dashboardData = await dashboardService.getDashboardData(req.user!.id);
  res.json(dashboardData);
});
