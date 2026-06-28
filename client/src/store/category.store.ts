import { create } from "zustand";
import {
  getAllCategories as getAllCategoriesApi,
  getCategoryById as getCategoryByIdApi,
  addCategory as addCategoryApi,
  updateCategory as updateCategoryApi,
  deleteCategory as deleteCategoryApi,
} from "@/api/category.api";
import type { Category } from "@/types/categoryTypes/Category";

interface CategoryActions {
  fetchCategoryList: () => Promise<void>;
  fetchCategoryById: (id: string) => Promise<void>;
  insertCategory: (payload: Omit<Category, "id">) => Promise<void>;
  updateCategory: (
    id: string,
    payload: Partial<Omit<Category, "id">>,
  ) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

interface CategoryState {
  categoryList: Category[];
  category: Category | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  actions: CategoryActions;
}

const initialState = {
  categoryList: [],
  category: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const categoryStore = create<CategoryState>((set) => ({
  ...initialState,
  actions: {
    fetchCategoryList: async () => {
      set({ isLoading: true, isError: false, errorMessage: "" });
      const result = await getAllCategoriesApi();
      set({
        categoryList: result.data.categories,
        isLoading: false,
      });
    },

    fetchCategoryById: async (id) => {
      set({ isLoading: true, isError: false, errorMessage: "" });
      const result = await getCategoryByIdApi(id);
      set({
        category: result.data.category,
        isLoading: false,
      });
    },

    insertCategory: async (payload) => {
      set({ isLoading: true, isError: false, errorMessage: "" });
      const result = await addCategoryApi(payload);
      set((state) => ({
        categoryList: [...state.categoryList, result.data.category],
        isLoading: false,
      }));
    },

    updateCategory: async (id, payload) => {
      set({ isLoading: true, isError: false, errorMessage: "" });
      const result = await updateCategoryApi(id, payload);
      set((state) => ({
        categoryList: state.categoryList.map((item) =>
          item.id === id ? result.data.category : item,
        ),
        category: result.data.category,
        isLoading: false,
      }));
    },

    deleteCategory: async (id) => {
      set({ isLoading: true, isError: false, errorMessage: "" });
      await deleteCategoryApi(id);
      set((state) => ({
        categoryList: state.categoryList.filter((item) => item.id !== id),
        category: null,
        isLoading: false,
      }));
    },
  },
}));