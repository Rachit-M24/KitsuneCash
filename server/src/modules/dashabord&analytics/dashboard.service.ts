import { title } from "node:process";
import expenseModel from "../expense/expense.model.js";
import goalModel from "../goal/goal.model.js";
import { DashboardResponseDto } from "./DTOs/dashboardResponse.dto.js";

export const dashboardService = {
  
  getDashboardData: async (userId: string): Promise<DashboardResponseDto> => {
    const budgetSummary = await expenseModel.aggregate([
      {
        $group: {
          _id: "$categoryId",
          expenses: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $lookup: {
          from: "budgets",
          localField: "_id",
          foreignField: "categoryId",
          as: "budgets",
        },
      },
      {
        $project: {
          categoryId: "$_id",
          categoryName: { $arrayElemAt: ["$categories.name", 0] },
          budget: { $arrayElemAt: ["$budgets.amount", 0] },
          spent: { $sum: "$expenses.amount" },
          remaining: {
            $subtract: [
              { $arrayElemAt: ["$budgets.amount", 0] },
              { $sum: "$expenses.amount" },
            ],
          },
        },
      },
    ]);
    const goals = await goalModel.find({ userId, status: "active" });
    const goalSummary = goals.map((g) => ({
          title: g.title,
          targetAmount: g.targetAmount,
          currentAmount: g.currentAmount,
          progressPercentage: Math.round(
            (g.currentAmount / g.targetAmount) * 100,
          ),
        }));

    const allExpenses = await expenseModel.find({ userId });
    const totalExpense = allExpenses.reduce((sum, e) => sum + e.amount, 0);

    const trendSummary = {
      totalExpense,
      totalIncome: 0,
      totalBalance: -totalExpense,
      totalCategories: budgetSummary.length,
    };

    const totalSpent = budgetSummary.reduce(
      (sum: number, b: any) => sum + b.spent,
      0,
    );
    const totalBudget = budgetSummary.reduce(
      (sum: number, b: any) => sum + b.budget,
      0,
    );

    const dashboardSummary = {
      totalSpent,
      totalBudget,
      totalRemaining: totalBudget - totalSpent,
      activeGoals: goalSummary,
    };

    return {
      dashboardSummary,
      budgetSummary,
      goalSummary,
      trendSummary,
    };
  },
};
