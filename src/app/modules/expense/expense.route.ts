import express from "express";
import auth from "../../middleware/auth";
import { expenseController } from "./expense.controller";

const router = express.Router();
router.post("/create", auth("User"), expenseController.createExpense);
router.get("/", auth("User"), expenseController.getExpenses);
router.delete("/:id", expenseController.deleteExpense);
router.put("/:id", expenseController.updateExpense);

export const expenseRoutes = router;
