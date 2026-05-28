import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import {
  clearRefreshTokenCookie,
  setRefreshTokenCookie,
} from "../../utils/cookies.js";
import { env } from "../../config/env.js";
import * as authService from "./auth.service.js";

const getRefreshTokenFromRequest = (req: Request) => {
  if (req.cookies?.refreshToken) {
    return req.cookies.refreshToken as string;
  }

  if (typeof req.body?.refreshToken === "string") {
    return req.body.refreshToken;
  }

  return undefined;
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await authService.register(
    req.body,
  );

  setRefreshTokenCookie(res, refreshToken);
  res.status(201).json({ user, accessToken });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  setRefreshTokenCookie(res, refreshToken);
  res.status(200).json({ user, accessToken });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = getRefreshTokenFromRequest(req);

  if (!refreshToken) {
    res.status(401).json({ message: "Missing refresh token" });
    return;
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await authService.refresh(refreshToken);

  setRefreshTokenCookie(res, newRefreshToken);
  res.status(200).json({ accessToken });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = getRefreshTokenFromRequest(req);
  await authService.logout(refreshToken);

  clearRefreshTokenCookie(res);
  res.status(204).send();
});

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { resetToken } = await authService.forgotPassword(req.body.email);

    const payload: Record<string, unknown> = {
      message: "If the email exists, reset instructions were sent.",
    };

    if (resetToken && env.NODE_ENV !== "production") {
      payload.resetToken = resetToken;
    }

    res.status(200).json(payload);
  },
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await authService.resetPassword(
      req.body.token,
      req.body.newPassword,
    );

    setRefreshTokenCookie(res, refreshToken);
    res.status(200).json({ user, accessToken });
  },
);
