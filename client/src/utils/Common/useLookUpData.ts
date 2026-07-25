import { useMemo, useRef } from "react";

import { categoryStore } from "@/store/category.store";
import type { Category } from "@/types/categoryTypes/Category";
import { getBudgetCategoryId } from "@/types/budgetTypes/Budget";

export interface LookupOption<TValue extends string | number> {
  label: string;
  value: TValue;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function useLookupData() {
  const { categoryList, actions: categoryActions } = categoryStore();
  const hasFetchedCategoriesRef = useRef(false);

  if (!hasFetchedCategoriesRef.current && categoryList.length === 0) {
    hasFetchedCategoriesRef.current = true;
    void categoryActions.fetchCategoryList();
  }

  const categoryOptions = useMemo<LookupOption<string>[]>(
    () =>
      categoryList.map((category) => ({
        label: category.name,
        value: category.id ?? getBudgetCategoryId(category as never),
      })),
    [categoryList],
  );

  const categoryMap = useMemo<Record<string, Category>>(
    () =>
      Object.fromEntries(
        categoryList.map((category) => [
          category.id ?? getBudgetCategoryId(category as never),
          category,
        ]),
      ) as Record<string, Category>,
    [categoryList],
  );

  const monthOptions = useMemo<LookupOption<number>[]>(
    () =>
      MONTH_NAMES.map((name, index) => ({
        label: name,
        value: index + 1,
      })),
    [],
  );

  const monthMap = useMemo<Record<number, string>>(
    () =>
      Object.fromEntries(
        MONTH_NAMES.map((name, index) => [index + 1, name]),
      ) as Record<number, string>,
    [],
  );

  return {
    categoryOptions,
    categoryMap,
    monthOptions,
    monthMap,
  };
}
