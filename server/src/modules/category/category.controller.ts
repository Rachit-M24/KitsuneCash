import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import * as categoryService from "./category.service.js";

export const InsertCategory = asyncHandler(async (req: Request, res: Response) => {
  const { category } = await categoryService.insertCategory(req.user!.id, req.body);

  res.status(201).json({ category });
});

export const GetCategories = asyncHandler(async (req: Request, res: Response) => {
  const { categories } = await categoryService.getCategories(req.user!.id);

  res.status(200).json({ categories });
});

export const GetCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const { category } = await categoryService.getCategoryById(
    req.user!.id,
    req.params.categoryId,
  );

  res.status(200).json({ category });
});

export const UpdateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { category } = await categoryService.updateCategory(
    req.user!.id,
    req.params.categoryId,
    req.body,
  );

  res.status(200).json({ category });
});

export const DeleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const result = await categoryService.deleteCategory(
    req.user!.id,
    req.params.categoryId,
  );

  res.status(200).json(result);
});