import mongoose from "mongoose";

const AiStatus = ["active", "inactive"] as const;
type AiStatus = (typeof AiStatus)[number];

export interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  passwordHash: string;
  aiAssistantName: string;
  aiAssistantStatus: AiStatus;
  passwordResetTokenHash?: string;
  passwordResetExpiresAt?: Date;
  refreshTokenHash?: string;
  refreshTokenExpiresAt?: Date;
  passwordChangedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    passwordResetTokenHash: {
      type: String,
      select: false,
    },
    passwordResetExpiresAt: {
      type: Date,
    },

    refreshTokenHash: {
      type: String,
      select: false,
    },
    refreshTokenExpiresAt: {
      type: Date,
    },

    passwordChangedAt: {
      type: Date,
    },

    aiAssistantName: {
      type: String,
      default: "Kitsune",
      trim: true,
    },
    aiAssistantStatus: {
      type: String,
      enum: AiStatus,
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ passwordResetTokenHash: 1 });

export default mongoose.model<UserDocument>("User", userSchema);
