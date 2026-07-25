import { z } from "zod";

export const budgetSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: "Amount is required." })
    .positive("Amount must be greater than 0."),
  categoryId: z
    .string({ required_error: "Category is required." })
    .min(1, "Category is required."),
  month: z.coerce
    .number({ invalid_type_error: "Month is required." })
    .int("Month must be a valid month.")
    .min(1, "Month is required.")
    .max(12, "Month must be between 1 and 12."),
  year: z.coerce
    .number({ invalid_type_error: "Year is required." })
    .int("Year must be a valid year.")
    .min(1900, "Year must be 1900 or later.")
    .max(2100, "Year must be 2100 or earlier."),
});

export type BudgetFormValues = z.infer<typeof budgetSchema>;
