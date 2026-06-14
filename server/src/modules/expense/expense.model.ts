import mongoose from "mongoose";

export interface ExpenseDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  amount: number;
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new mongoose.Schema<ExpenseDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

  },
  { timestamps: true },
);

expenseSchema.index({ userId: 1, date: -1 });

export default mongoose.model<ExpenseDocument>("Expense", expenseSchema);
