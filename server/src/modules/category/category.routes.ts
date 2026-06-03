import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { validateBody } from "../../middleware/validate.js";
import * as categoryController from "./category.controller.js";
import {
  insertCategorySchema,
  updateCategorySchema,
} from "./category.validation.js";

const router = Router();

router.use(authenticate);

router.get("/", categoryController.GetCategories);
router.get("/:categoryId", categoryController.GetCategoryById);

router.post("/", validateBody(insertCategorySchema), categoryController.InsertCategory);

router.patch(
  "/:categoryId",
  validateBody(updateCategorySchema),
  categoryController.UpdateCategory,
);

router.delete("/:categoryId", categoryController.DeleteCategory);

export default router;