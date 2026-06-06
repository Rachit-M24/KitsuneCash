import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import * as goalService from "./goal.service.js";

export const InsertGoal = asyncHandler(async (req: Request, res: Response) => {
  const { goal } = await goalService.createGoal(req.user!.id, req.body);

  res.status(201).json({ goal });
});

export const GetGoals = asyncHandler(async (req: Request, res: Response) => {
  const { goals } = await goalService.getGoals(req.user!.id);

  res.status(200).json({ goals });
});

export const GetGoalById = asyncHandler(async (req: Request, res: Response) => {
  const { goal } = await goalService.getGoalById(
    req.user!.id,
    req.params.goalId.toString(),
  );

  res.status(200).json({ goal });
});

export const UpdateGoal = asyncHandler(async (req: Request, res: Response) => {
  const { goal } = await goalService.updateGoal(
    req.user!.id,
    req.params.goalId.toString(),
    req.body,
  );

  res.status(200).json({ goal });
});

export const DeleteGoal = asyncHandler(async (req: Request, res: Response) => {
  const result = await goalService.deleteGoal(
    req.user!.id,
    req.params.goalId.toString(),
  );

  res.status(200).json(result);
});