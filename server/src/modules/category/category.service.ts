import mongoose from "mongoose";
import { Category } from "../../models/category.model.js";
import { HttpError } from "../../utils/http.js";

type CategoryRecord = {
  _id: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId | null;
  name: string;
  icon: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const toPublicCategory = (category: CategoryRecord) => ({
  id: category._id.toString(),
  userId: category.userId?.toString() ?? null,
  name: category.name,
  icon: category.icon,
  isDefault: category.isDefault,
  createdAt: category.createdAt,
  updatedAt: category.updatedAt,
});

const assertValidCategoryId = (categoryId: string) => {
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new HttpError("Invalid category id", 400);
  }
};

const getAccessibleCategory = async (userId: string, categoryId: string) => {
  assertValidCategoryId(categoryId);

  const category = await Category.findOne({
    _id: categoryId,
    $or: [{ userId }, { userId: null }],
  });

  if (!category) {
    throw new HttpError("Category not found", 404);
  }

  return category;
};

const assertCanModifyCategory = (
  category: CategoryRecord,
  userId: string,
) => {
  if (category.isDefault || !category.userId) {
    throw new HttpError("Cannot modify default category", 403);
  }

  if (category.userId.toString() !== userId) {
    throw new HttpError("Category not found", 404);
  }
};

export const insertCategory = async (
  userId: string,
  input: { name: string; icon?: string },
) => {
  const existing = await Category.findOne({ userId, name: input.name });

  if (existing) {
    throw new HttpError("Category name already exists", 409);
  }

  const category = await Category.create({
    userId,
    name: input.name,
    icon: input.icon ?? "📦",
    isDefault: false,
  });

  return { category: toPublicCategory(category) };
};

export const getCategories = async (userId: string) => {
  const categories = await Category.find({
    $or: [{ userId }, { userId: null }],
  }).sort({ isDefault: -1, name: 1 });

  return { categories: categories.map(toPublicCategory) };
};

export const getCategoryById = async (userId: string, categoryId: string) => {
  const category = await getAccessibleCategory(userId, categoryId);

  return { category: toPublicCategory(category) };
};

export const updateCategory = async (
  userId: string,
  categoryId: string,
  input: { name?: string; icon?: string },
) => {
  const category = await getAccessibleCategory(userId, categoryId);
  assertCanModifyCategory(category, userId);

  if (input.name && input.name !== category.name) {
    const duplicate = await Category.findOne({
      userId,
      name: input.name,
      _id: { $ne: categoryId },
    });

    if (duplicate) {
      throw new HttpError("Category name already exists", 409);
    }
  }

  if (input.name !== undefined) category.name = input.name;
  if (input.icon !== undefined) category.icon = input.icon;

  await category.save();

  return { category: toPublicCategory(category) };
};

export const deleteCategory = async (userId: string, categoryId: string) => {
  const category = await getAccessibleCategory(userId, categoryId);
  assertCanModifyCategory(category, userId);

  await category.deleteOne();

  return { message: "Category deleted" };
};