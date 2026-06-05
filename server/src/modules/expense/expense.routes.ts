import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { validateBody } from "../../middleware/validate.js";
import * as expenseController from "./expense.controller.js";
import { insertExpenseSchema } from "./expense.validation.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  validateBody(insertExpenseSchema),
  expenseController.InsertExpense,
);
router.get("/", expenseController.GetExpenses);
router.get("/:expenseId", expenseController.GetExpenseById);
router.patch("/:expenseId", expenseController.UpdateExpense);
router.delete("/:expenseId", expenseController.DeleteExpense);
export default router;
