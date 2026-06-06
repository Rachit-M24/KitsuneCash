import { z } from "zod";

const goalStatusSchema = z.enum(["active", "completed", "paused"]);

export const insertGoalSchema = z.object({
  title: z.string().trim().min(1).max(100),
  description: z.string().trim().max(500).optional(),
  targetAmount: z.number().min(1),
  targetDate: z.coerce.date().optional(),
});

export const updateGoalSchema = z
  .object({
    title: z.string().trim().min(1).max(100).optional(),
    description: z.string().trim().max(500).optional(),
    targetAmount: z.number().min(1).optional(),
    currentAmount: z.number().min(0).optional(),
    targetDate: z.coerce.date().optional(),
    status: goalStatusSchema.optional(),
  })
  .refine(
    (data) =>
      data.title !== undefined ||
      data.description !== undefined ||
      data.targetAmount !== undefined ||
      data.currentAmount !== undefined ||
      data.targetDate !== undefined ||
      data.status !== undefined,
    {
      message: "At least one field must be provided",
    },
  );