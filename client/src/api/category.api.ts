import api from "@/api/axios";
import { API_PATHS } from "@/constants/api.constant";
import type { Category } from "@/types/categoryTypes/Category";

export interface CategoryListResponse {
  categories: Category[];
  message?: string;
}

export interface CategoryResponse {
  category: Category;
  message?: string;
}

export const getAllCategories = async () => {
  return api.get<CategoryListResponse>(API_PATHS.category.getAllCategory);
};

export const getCategoryById = async (id: string) => {
  return api.get<CategoryResponse>(API_PATHS.category.getCategoryById(id));
};

export const addCategory = async (
  payload: Omit<Category, "id">,
) => {
  return api.post<CategoryResponse>(API_PATHS.category.addCategory, payload);
};

export const updateCategory = async (
  id: string,
  payload: Partial<Omit<Category, "id">>,
) => {
  return api.put<CategoryResponse>(
    API_PATHS.category.updateCategory(id),
    payload,
  );
};

export const deleteCategory = async (id: string) => {
  return api.delete(API_PATHS.category.deleteCategory(id));
};
