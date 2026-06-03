import Expense, { ExpenseDocument } from "../../models/expense.model.js";
import { HttpError } from "../../utils/http.js";

const toPublicExpense = (expense: ExpenseDocument) => ({
  id: expense._id.toString(),
  amount: expense.amount,
  description: expense.description,
  categoryId: expense.categoryId.toString(),
  date: expense.date,
  createdAt: expense.createdAt,
  updatedAt: expense.updatedAt,
});

export const insertExpense = async (
  userId: string,
  input: {
    amount: number;
    description?: string;
    categoryId: string;
    date: Date;
  },
) => {
  const expense = await Expense.create({
    userId,
    amount: input.amount,
    description: input.description,
    categoryId: input.categoryId,
    date: input.date,
  });

  return { expense: toPublicExpense(expense) };
};

export const getExpenses = async (userId: string)=>{
  const expenses = await Expense.find({ userId }).sort({ date: -1 });

  return { expenses: expenses.map(toPublicExpense) };
}
