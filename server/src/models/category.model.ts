import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
      default: null,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    icon: {
      type: String,
      default: "📦",
      trim: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index(
  {
    userId: 1,
    name: 1,
  },
  {
    unique: true,
  }
);

export const Category = mongoose.model(
  "Category",
  categorySchema
);