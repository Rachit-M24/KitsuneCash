import { Router } from "express";
import * as dashboardController from "./dashboard.controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = Router();
router.use(authenticate);

router.get("/", dashboardController.getDashboardData);

export default router;
