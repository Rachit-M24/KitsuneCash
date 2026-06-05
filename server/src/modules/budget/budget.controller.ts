import { asyncHandler } from "../../middleware/asyncHandler.js";
import * as budgetService from "./budget.service.js";
import { Request, Response } from "express";


export const getAllBudgets = asyncHandler(async (req: Request, res: Response) => {
  const { budgets } = await budgetService.getAllBudgets(
    req.user!.id,
    req.params.budgetId.toString(),
  );
  res.status(200).json({ budgets });
});

export const createBudget = asyncHandler(async (req: Request, res: Response) => {
  const { budget } = await budgetService.createBudget(req.user!.id, req.body);
  res.status(201).json({ budget });
});

export const updateBudget = asyncHandler(async (req: Request, res: Response) => {
  const { budget } = await budgetService.updateBudget(
    req.user!.id,
    req.params.budgetId.toString(),
    req.body,
  );
  res.status(200).json({ budget });
});

export const deleteBudget = asyncHandler(async (req: Request, res: Response) => {
  const result = await budgetService.deleteBudget(
    req.user!.id,
    req.params.budgetId.toString(),
  );
  res.status(200).json(result);
});
