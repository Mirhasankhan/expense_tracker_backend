import express from "express";
import auth from "../../middleware/auth";
import { expenseController } from "./expense.controller";
import validateRequest from "../../middleware/validateRequest";
import {
  expenseValidationSchema,
  updateExpenseValidationSchema,
} from "./expense.validation";

const router = express.Router();
router.post(
  "/create",
  auth("User"),
  validateRequest(expenseValidationSchema),
  expenseController.createExpense
);
router.get("/", auth("User"), expenseController.getExpenses);
router.get("/category", auth("User"), expenseController.categoryWiseExpense);
router.delete("/:id", expenseController.deleteExpense);
router.put(
  "/:id",
  validateRequest(updateExpenseValidationSchema),
  expenseController.updateExpense
);

export const expenseRoutes = router;
