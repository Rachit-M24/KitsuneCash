import { Router } from "express";
import { validateBody } from "../../middleware/validate.js";
import * as authController from "./auth.controller.js";
import {
  currentUserSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "./auth.validation.js";

const router = Router();

router.post("/register", validateBody(registerSchema), authController.register);
router.post("/login", validateBody(loginSchema), authController.login);
router.post("/me", validateBody(currentUserSchema), authController.getCurrenUser);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.post(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  authController.forgotPassword,
);
router.post(
  "/reset-password",
  validateBody(resetPasswordSchema),
  authController.resetPassword,
);

export default router;
