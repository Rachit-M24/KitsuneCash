import { removeUndefined } from "../../utils/filterConfigBuilder.js";
import { FinancialFilterDto } from "../Dto/api.filterDto.js";
import Goal from "./goal.model.js";

export const createGoal = async (
  userId: string,
  input: {
    title: string;
    description?: string;
    targetAmount: number;
    targetDate?: Date;
  },
) => {
  const goal = await Goal.create({ ...input, userId });
  return { goal };
};

export const getGoals = async (userId: string, query: FinancialFilterDto) => {
  const filter = removeUndefined({ ...query, userId });
  const goals = await Goal.find(filter).sort({ createdAt: -1 });
  return { goals };
};

export const getGoalById = async (userId: string, goalId: string) => {
  const goal = await Goal.findOne({ userId, _id: goalId });
  return { goal };
};

export const updateGoal = async (
  userId: string,
  goalId: string,
  input: {
    title?: string;
    description?: string;
    targetAmount?: number;
    currentAmount?: number;
    targetDate?: Date;
    status?: "active" | "completed" | "paused";
  },
) => {
  const goal = await Goal.findOneAndUpdate(
    { userId, _id: goalId },
    { ...input },
    { new: true },
  );
  return { goal };
};

export const deleteGoal = async (userId: string, goalId: string) => {
  const goal = await Goal.findOneAndDelete({ userId, _id: goalId });
  return { goal };
};
