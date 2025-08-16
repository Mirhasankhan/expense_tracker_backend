import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { expenseServices } from "./expense.service";

const createExpense = catchAsync(async (req, res) => {
  const expense = await expenseServices.createExpenseIntoDB(
    req.user.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Expense listed successfully",
    data: expense,
  });
});
const getExpenses = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const search = req.query.search;
  const category = req.query.category;
  const expenses = await expenseServices.getExpensesFromDB(
    userId,
    search as string,
    category as string
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Expenses retrieved successfully",
    data: expenses,
  });
});
const categoryWiseExpense = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const expenses = await expenseServices.getCategoryWiseExpensesFromDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Expenses retrieved successfully",
    data: expenses,
  });
});
const updateExpense = catchAsync(async (req, res) => {
  const expenses = await expenseServices.editExpenseFromDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Expenses updated successfully",
    data: expenses,
  });
});
const deleteExpense = catchAsync(async (req, res) => {
  await expenseServices.deleteExpenseFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Expenses deleted successfully",
  });
});

export const expenseController = {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  categoryWiseExpense
};
