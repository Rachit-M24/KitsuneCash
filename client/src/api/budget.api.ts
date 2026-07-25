import api from "@/api/axios";
import { API_PATHS } from "@/constants/api.constant";
import type { Budget } from "@/types/budgetTypes/Budget";

export interface BudgetListResponse {
  budgets: Budget[];
}

export interface BudgetResponse {
  budget: Budget;
}

export const getAllBudgets = async () => {
  return api.get<BudgetListResponse>(API_PATHS.budget.getAllBudget);
};

export const getBudgetById = async (id: string) => {
  return api.get<BudgetResponse>(API_PATHS.budget.getBudgetById(id));
};

export const createBudget = async (
  payload: Omit<Budget, "id" | "createdAt" | "updatedAt">,
) => {
  return api.post<BudgetResponse>(API_PATHS.budget.addBudget, payload);
};

export const updateBudget = async (
  id: string,
  payload: Partial<Omit<Budget, "id" | "createdAt" | "updatedAt">>,
) => {
  return api.put<BudgetResponse>(API_PATHS.budget.updateBudget(id), payload);
};

export const deleteBudget = async (id: string) => {
  return api.delete(API_PATHS.budget.deleteBudget(id));
};
