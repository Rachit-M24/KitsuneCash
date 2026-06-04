import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { validateBody } from "../../middleware/validate.js";
import * as expenseController from "./expense.controller.js";
import { insertExpenseSchema } from "./expense.validation.js";

const router = Router();

router.post("/", authenticate, validateBody(insertExpenseSchema), 
 expenseController.InsertExpense);
router.get("/", authenticate, expenseController.GetExpenses);
router.get("/:expenseId", authenticate, expenseController.GetExpenseById);
router.patch("/:expenseId", authenticate, expenseController.UpdateExpense);
router.delete("/:expenseId", authenticate, expenseController.DeleteExpense);
export default router;