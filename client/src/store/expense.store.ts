import { createExpense, deleteExpense, getAllExpenses, getExpenseById, updateExpense } from "@/api/expense.api";
import type { Expense } from "@/types/expenseTypes/Expense";
import { create } from "zustand";

interface ExpenseActions {
    insertExpense: (expense: Expense) => void;
    fetchExpenseList: () => void;
    fetchExpenseById: (id: string) => void;
    updateExpense: (expense: Expense) => void;
    deleteExpense: (id: string) => void;
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
    errorMessage: '',
}
export const expenseStore = create<ExpenseState & ExpenseActions>((set) => ({
    ...initialState,
    insertExpense: async (expense: Expense) => {
        const result = await createExpense(expense);
        set((state) => ({
            expenseList: [...state.expenseList, result.data.expense],
        }))
    },
    fetchExpenseList: async () => {
        const result = await getAllExpenses();
        set(() => ({
            expenseList: result.data.expenses,
        }))
    },
    fetchExpenseById: async (id: string) => {
        const expense = await getExpenseById(id);
        set({ expense: expense.data.expense });
    },
    updateExpense: async (expense: Expense) => {
        const updatedExpense = await updateExpense(expense.id, expense);
        set((state) => ({ expenseList: state.expenseList.map((item) => item.id === expense.id ? updatedExpense.data.expense : item) }))
    },
    deleteExpense: async (id: string) => {
        await deleteExpense(id);
    }
}));