import type { Expense } from "@/types/Expense";
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
    insertExpense: (expense: Expense) => set((state) => ({
        expenseList: [...state.expenseList, expense],
    })),
    fetchExpenseList: () => set((state) =>{
        return {
            expenseList: [...state.expenseList],
        }
    }),
    fetchExpenseById: (id: string) => set((state) => {
        const expense = state.expenseList.find((expense) => expense.id === id) || null;
        return {
            expense,
        }
    }),
    updateExpense: (expense: Expense) => set((state) => ({
        expenseList: state.expenseList.map((item) => item.id === expense.id ? expense : item),
    })),
    deleteExpense: (id: string) => set((state) => ({
        expenseList: state.expenseList.filter((expense) => expense.id !== id),
    })),
}));