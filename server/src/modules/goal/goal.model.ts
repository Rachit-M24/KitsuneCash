import mongoose from "mongoose";

const GoalStatus = [
  "active",
  "completed",
  "paused",
] as const;

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    targetAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    currentAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    targetDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: GoalStatus,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

goalSchema.index({
  userId: 1,
  status: 1,
});

export default mongoose.model("Goal", goalSchema);