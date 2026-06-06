import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { validateBody } from "../../middleware/validate.js";
import * as goalController from "./goal.controller.js";
import { insertGoalSchema, updateGoalSchema } from "./goal.validation.js";

const router = Router();

router.use(authenticate);

router.get("/", goalController.GetGoals);
router.get("/:goalId", goalController.GetGoalById);

router.post("/", validateBody(insertGoalSchema), goalController.InsertGoal);

router.patch(
  "/:goalId",
  validateBody(updateGoalSchema),
  goalController.UpdateGoal,
);

router.delete("/:goalId", goalController.DeleteGoal);

export default router;