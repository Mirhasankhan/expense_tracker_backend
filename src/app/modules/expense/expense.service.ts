import AppError from "../../utils/AppError";
import { User } from "../user/user.model";
import { Expense, TExpense } from "./expense.model";
import { Types } from "mongoose";

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

const getExpensesFromDB = async (
  userId: string,
  search?: string,
  category?: string
) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const filter: any = { userId };
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  const expenses = await Expense.find(filter).lean();

  if (!expenses || expenses.length === 0) {
    throw new AppError(404, "No expense found");
  }

  return expenses;
};
const getSingleExpenseFromDb = async (expenseId: string) => {
  const expense = await Expense.findById(expenseId);
  if (!expense) {
    throw new AppError(404, "Expense not found");
  }
  return expense
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

const getCategoryWiseExpensesFromDB = async (userId: string) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const result = await Expense.aggregate([
    { $match: { userId: new Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);

  const categoryWise: Record<string, number> = {};
  let totalExpense = 0;

  result.forEach((item) => {
    categoryWise[item._id] = item.total;
    totalExpense += item.total;
  });

  return {
    categoryWise,
    totalExpense,
  };
};


export const expenseServices = {
  createExpenseIntoDB,
  getExpensesFromDB,
  deleteExpenseFromDB,
  editExpenseFromDB,
  getCategoryWiseExpensesFromDB,
  getSingleExpenseFromDb
};
