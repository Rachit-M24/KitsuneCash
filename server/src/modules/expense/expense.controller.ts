import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import * as expenseService from "./expense.service.js";

export const InsertExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const { expense } = await expenseService.insertExpense(
      req.user!.id,
      req.body,
    );

    res.status(201).json({ expense });
  },
);

export const GetExpenses = asyncHandler(async (req: Request, res: Response) => {
  const { expenses } = await expenseService.getExpenses(req.user!.id);

  res.status(200).json({ expenses });
});

export const GetExpenseById = asyncHandler(
  async (req: Request, res: Response) => {
    const { expense } = await expenseService.getExpenseById(
      req.user!.id,
      req.params.expenseId.toString(),
    );

    res.status(200).json({ expense });
  },
);

export const UpdateExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const { expense } = await expenseService.updateExpense(
      req.user!.id,
      req.params.expenseId.toString(),
      req.body,
    );

    res.status(200).json({ expense });
  },
);

export const DeleteExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const { expense } = await expenseService.deleteExpense(
      req.user!.id,
      req.params.expenseId.toString(),
    );

    res.status(200).json({ expense });
  },
);
