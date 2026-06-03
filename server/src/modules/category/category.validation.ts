 import { z } from "zod";

export const insertCategorySchema = z.object({
  name: z.string().trim().min(1).max(50),
  icon: z.string().trim().max(10).optional(),
});

export const updateCategorySchema = z
  .object({
    name: z.string().trim().min(1).max(50).optional(),
    icon: z.string().trim().max(10).optional(),
  })
  .refine((data) => data.name !== undefined || data.icon !== undefined, {
    message: "At least one field must be provided",
  });