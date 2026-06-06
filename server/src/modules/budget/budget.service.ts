import { Budget } from "./budget.model.js";
import { HttpError } from "../../utils/http.js";

export const getAllBudgets = async (userId: string, budgetId: string) => {
  const budgets = await Budget.find({ userId }).populate(
    "categoryId",
    "name icon",
  );

  return { budgets };
};

export const createBudget = async (
  userId: string,
  input: { amount: number; categoryId: string; month: number; year: number },
) => {
  const budget = await Budget.create({ ...input, userId });

  return { budget };
};

export const updateBudget = async (
  userId: string,
  budgetId: string,
  input: Partial<typeof Budget.prototype>,
) => {
  const budget = await Budget.findOne({ _id: budgetId, userId });

  if (!budget) {
    throw new HttpError("Budget not found", 404);
  }

  if (input.amount !== undefined) budget.amount = input.amount;
  if (input.categoryId !== undefined) budget.categoryId = input.categoryId;
  if (input.month !== undefined) budget.month = input.month;
  if (input.year !== undefined) budget.year = input.year;

  await budget.save();

  return { budget };
};

export const deleteBudget = async (userId: string, budgetId: string) => {
  const budget = await Budget.findOneAndDelete({ _id: budgetId, userId });

  if (!budget) {
    throw new HttpError("Budget not found", 404);
  }

  await budget.deleteOne();

  return { message: "Budget deleted successfully" };
};
