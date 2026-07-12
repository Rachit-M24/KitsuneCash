import { z } from "zod";

export const expenseSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(1, "Title is required.")
    .max(100, "Title must be 100 characters or fewer."),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  amount: z.coerce
    .number({ invalid_type_error: "Amount is required." })
    .positive("Amount must be greater than 0."),
  category: z
    .string({ required_error: "Category is required." })
    .min(1, "Category is required."),
  date: z
    .string({ required_error: "Date is required." })
    .min(1, "Date is required."),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
