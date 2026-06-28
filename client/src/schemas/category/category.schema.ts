import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(1, "Name is required.")
    .max(50, "Name must be 50 characters or fewer."),
  icon: z
    .string({ required_error: "Please pick an icon." })
    .min(1, "Please pick an icon."),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
