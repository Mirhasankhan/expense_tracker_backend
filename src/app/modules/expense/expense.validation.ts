import { z } from "zod";
import { Types } from "mongoose";

export const expenseValidationSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .trim(),
  amount: z
    .number({ required_error: "Amount is required" })
    .positive({ message: "Amount must be greater than 0" }),
  category: z.enum(["Food", "Transport", "Shopping", "Others"], {
    required_error: "Category is required",
  }),
  date: z.preprocess(
    (arg) =>
      typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
    z.date({
      required_error: "Date is required",
      invalid_type_error: "Invalid date format",
    })
  ),
});

export type ExpenseInput = z.infer<typeof expenseValidationSchema>;

export const updateExpenseValidationSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .trim()
    .optional(),
  amount: z
    .number()
    .positive({ message: "Amount must be greater than 0" })
    .optional(),
  category: z.enum(["Food", "Transport", "Shopping", "Others"]).optional(),
  date: z
    .preprocess(
      (arg) =>
        typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
      z.date({ invalid_type_error: "Invalid date format" })
    )
    .optional(),
});

export type UpdateExpenseInput = z.infer<typeof updateExpenseValidationSchema>;
