import type { Category } from "@/types/categoryTypes/Category";

export interface BudgetCategoryLike {
  _id?: string;
  id?: string;
  name?: string;
  icon?: string;
}

export interface Budget {
  id?: string;
  _id?: string;
  amount: number;
  categoryId: string | BudgetCategoryLike;
  month: number;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetFormPayload {
  amount: number;
  categoryId: string;
  month: number;
  year: number;
}

export function getBudgetCategoryId(
  category: string | BudgetCategoryLike,
): string {
  if (typeof category === "string") {
    return category;
  }

  return category?._id ?? category?.id ?? "";
}

export function getBudgetDocumentId(budget: Budget): string {
  return budget?.id ?? budget?._id ?? "";
}

export function normalizeBudgetCategory(
  category: Budget["categoryId"],
): string {
  return getBudgetCategoryId(category);
}

export function getBudgetCategoryName(
  category: Budget["categoryId"],
  categoryLookup: Record<string, Category>,
): string {
  const normalizedCategoryId = normalizeBudgetCategory(category);

  if (!normalizedCategoryId) {
    return "Unassigned";
  }

  return categoryLookup[normalizedCategoryId]?.name ?? "Unassigned";
}
