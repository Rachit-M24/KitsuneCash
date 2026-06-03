import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { validateBody } from "../../middleware/validate.js";
import * as expenseController from "./expense.controller.js";
import { insertExpenseSchema } from "./expense.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validateBody(insertExpenseSchema),
  expenseController.InsertExpense,
);

export default router;