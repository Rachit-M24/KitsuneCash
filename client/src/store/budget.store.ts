import { create } from "zustand";

import {
  createBudget as createBudgetApi,
  deleteBudget as deleteBudgetApi,
  getAllBudgets,
  getBudgetById,
  updateBudget as updateBudgetApi,
} from "@/api/budget.api";
import { getBudgetDocumentId, type Budget } from "@/types/budgetTypes/Budget";

interface BudgetActions {
  insertBudget: (
    payload: Omit<Budget, "id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
  fetchBudgetList: () => Promise<void>;
  fetchBudgetById: (id: string) => Promise<void>;
  updateBudget: (
    id: string,
    payload: Partial<Omit<Budget, "id" | "createdAt" | "updatedAt">>,
  ) => Promise<void>;
  deleteBudget: (id: string) => Promise<void>;
}

interface BudgetState {
  budgetList: Budget[];
  budget: Budget | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState = {
  budgetList: [],
  budget: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const budgetStore = create<BudgetState & BudgetActions>((set) => ({
  ...initialState,
  insertBudget: async (payload) => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    const result = await createBudgetApi(payload);
    set((state) => ({
      budgetList: [...state.budgetList, result.data.budget],
      isLoading: false,
    }));
  },
  fetchBudgetList: async () => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    const result = await getAllBudgets();
    set({
      budgetList: result.data.budgets,
      isLoading: false,
    });
  },
  fetchBudgetById: async (id) => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    const result = await getBudgetById(id);
    set({ budget: result.data.budget, isLoading: false });
  },
  updateBudget: async (id, payload) => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    const result = await updateBudgetApi(id, payload);
    const normalizedBudgetId = getBudgetDocumentId(result.data.budget);

    set((state) => ({
      budgetList: state.budgetList.map((item) => {
        const currentBudgetId = getBudgetDocumentId(item);
        return currentBudgetId === id || currentBudgetId === normalizedBudgetId
          ? result.data.budget
          : item;
      }),
      budget: result.data.budget,
      isLoading: false,
    }));
  },
  deleteBudget: async (id) => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    await deleteBudgetApi(id);
    set((state) => ({
      budgetList: state.budgetList.filter((item) => {
        const currentBudgetId = getBudgetDocumentId(item);
        return currentBudgetId !== id && currentBudgetId !== id;
      }),
      budget: null,
      isLoading: false,
    }));
  },
}));
