import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, "User name is required")
      .min(2, "User name must be at least 2 characters")
      .max(50, "User name must be at most 50 characters"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
