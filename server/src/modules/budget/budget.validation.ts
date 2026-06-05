import z from "zod";

export const upsertBudgetSchema = z.object({
  amount: z.number().positive(),
  categoryId: z.string().trim().min(1),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(1900).max(2100),
});
