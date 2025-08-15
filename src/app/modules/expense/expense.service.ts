import AppError from "../../utils/AppError";
import { User } from "../user/user.model";
import { Expense, TExpense } from "./expense.model";

const createExpenseIntoDB = async (userId: string, payload: TExpense) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const expenseData = {
    ...payload,
    userId,
  };

  const newExpense = await Expense.create(expenseData);
  return newExpense;
};

const getExpensesFromDB = async (userId: string) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const expenses = await Expense.find({ userId: userId }).lean();

  if (!expenses) {
    throw new AppError(404, "No expense found");
  }

  return expenses;
};

const deleteExpenseFromDB = async (expenseId: string) => {
  const expense = await Expense.findById(expenseId);
  if (!expense) {
    throw new AppError(404, "Expense not found");
  }

  await Expense.deleteOne({ _id: expenseId });
  return;
};

const editExpenseFromDB = async (
  expenseId: string,
  payload: Partial<TExpense>
) => {
  if (!payload || Object.keys(payload).length === 0) {
    throw new AppError(400, "No fields provided for update");
  }

  const updatedExpense = await Expense.findByIdAndUpdate(
    expenseId,
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (!updatedExpense) {
    throw new AppError(404, "Expense not found");
  }

  return updatedExpense;
};

export const expenseServices = {
  createExpenseIntoDB,
  getExpensesFromDB,
  deleteExpenseFromDB,
  editExpenseFromDB,
};
