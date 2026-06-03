import { z } from "zod";

export const insertExpenseSchema = z.object({
  amount: z.number().positive(),
  description: z.string().trim().max(500).optional(),
  categoryId: z.string().min(1),
  date: z.coerce.date(),
});