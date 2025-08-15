import { Schema, model, Document, Types } from "mongoose";


export interface TExpense extends Document {
  userId: Types.ObjectId; 
  title: string;
  amount: number;
  category: "Food" | "Transport" | "Shopping" | "Others";
  date: Date;
}

const expenseSchema = new Schema<TExpense>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },
    category: {
      type: String,
      enum: ["Food", "Transport", "Shopping", "Others"],
      required: [true, "Category is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      validate: {
        validator: (value: Date) => !isNaN(value.getTime()),
        message: "Invalid date format",
      },
    },
  },
  {
    timestamps: true, 
  }
);

export const Expense = model<TExpense>("Expense", expenseSchema);
