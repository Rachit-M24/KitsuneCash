import { Router } from "express";
import { validateBody } from "../../middleware/validate.js";
import * as budgetController from "./budget.controller.js";
import { upsertBudgetSchema } from "./budget.validation.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/", budgetController.getAllBudgets);
router.post("/", validateBody(upsertBudgetSchema), budgetController.createBudget);
router.put("/:budgetId", validateBody(upsertBudgetSchema), budgetController.updateBudget);
router.delete("/:budgetId", budgetController.deleteBudget);

export default router;
