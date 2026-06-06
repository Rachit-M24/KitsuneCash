import Expense, { ExpenseDocument } from "./expense.model.js";
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

export const getExpenseById = async (userId: string, expenseId: string) =>{
  const expense = await Expense.findOne({ _id:expenseId, userId });

  if(!expense){
    throw new HttpError("Expense not found", 404);
  }

  return { expense: toPublicExpense(expense) };
}

export const updateExpense = async( userId:string, expenseId: string, input: Partial<typeof Expense.prototype>) =>{
  const expense = await Expense.findOneAndUpdate(
    { _id: expenseId, userId },
    input,
    { new: true },
  );

  if(!expense){
    throw new HttpError("Expense not found", 404);
  }

  return { expense: toPublicExpense(expense) };
}

export const deleteExpense = async (userId: string, expenseId: string) => {
  const expense = await Expense.findOneAndDelete({
    _id: expenseId,
    userId,
  });

  if (!expense) {
    throw new HttpError("Expense not found", 404);
  }

  return { expense: toPublicExpense(expense) };
};