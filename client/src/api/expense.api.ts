import api from "@/api/axios";
import { API_PATHS } from "@/constants/api.constant";
import type { Expense } from "@/types/expenseTypes/Expense";

export interface ExpenseListResponse {
    expenses: Expense[];
}

export interface ExpenseResponse {
    expense: Expense;
}

export const getAllExpenses = async () => {
    return api.get<ExpenseListResponse>(API_PATHS.expense.getAllExpense);
};

export const getExpenseById = async (id: string) => {
    return api.get<ExpenseResponse>(API_PATHS.expense.getExpenseById(id));
};

export const createExpense = async (
    payload: Omit<Expense, "id" | "createdAt" | "updatedAt">,
) => {
    return api.post<ExpenseResponse>(API_PATHS.expense.addExpense, payload);
};

export const updateExpense = async (
    id: string,
    payload: Partial<Omit<Expense, "id" | "createdAt" | "updatedAt">>,
) => {
    return api.put<ExpenseResponse>(
        API_PATHS.expense.updateExpense(id),
        payload,
    );
};

export const deleteExpense = async (id: string) => {
    return api.delete<ExpenseResponse>(API_PATHS.expense.deleteExpense(id));
};
