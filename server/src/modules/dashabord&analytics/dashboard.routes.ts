import { Router } from "express";
import { getDashboardData } from "./dashboard.controller.js";
import { authenticate } from "../../middleware/authenticate.js";

const router = Router();
router.use(authenticate);

export const dashboardRoutes = () => {
  router.get("/dashboard", getDashboardData);
};
