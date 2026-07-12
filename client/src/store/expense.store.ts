import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
} from "@/api/expense.api";
import type { Expense } from "@/types/expenseTypes/Expense";
import { create } from "zustand";

interface ExpenseActions {
  insertExpense: (
    payload: Omit<Expense, "id" | "createdAt" | "updatedAt">,
  ) => Promise<void>;
  fetchExpenseList: () => Promise<void>;
  fetchExpenseById: (id: string) => Promise<void>;
  updateExpense: (
    id: string,
    payload: Partial<Omit<Expense, "id" | "createdAt" | "updatedAt">>,
  ) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

interface ExpenseState {
  expenseList: Expense[];
  expense: Expense | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState = {
  expenseList: [],
  expense: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const expenseStore = create<ExpenseState & ExpenseActions>((set) => ({
  ...initialState,
  insertExpense: async (payload) => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    const result = await createExpense(payload);
    set((state) => ({
      expenseList: [...state.expenseList, result.data.expense],
      isLoading: false,
    }));
  },
  fetchExpenseList: async () => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    const result = await getAllExpenses();
    set({
      expenseList: result.data.expenses,
      isLoading: false,
    });
  },
  fetchExpenseById: async (id) => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    const result = await getExpenseById(id);
    set({ expense: result.data.expense, isLoading: false });
  },
  updateExpense: async (id, payload) => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    const result = await updateExpense(id, payload);
    set((state) => ({
      expenseList: state.expenseList.map((item) =>
        item.id === id ? result.data.expense : item,
      ),
      expense: result.data.expense,
      isLoading: false,
    }));
  },
  deleteExpense: async (id) => {
    set({ isLoading: true, isError: false, errorMessage: "" });
    await deleteExpense(id);
    set((state) => ({
      expenseList: state.expenseList.filter((item) => item.id !== id),
      expense: null,
      isLoading: false,
    }));
  },
}));
