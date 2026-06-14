import { Aggregate } from "mongoose";
import { DashboardResponseDto } from "./DTOs/dashboardResponse.dto.js";
import expenseModel from "../expense/expense.model.js";

export const dashboardService = {
  getDashboardData: async (userId: string) => {
    const dashboardData: Aggregate<DashboardResponseDto[]> =
      expenseModel.aggregate([
        {
          $group: {
            _id: "$userId",
            totalExpenses: { $sum: "$amount" },
          },
        },
      ]);
    return { message: dashboardData };
  },
};
