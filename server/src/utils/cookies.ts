import { Response } from "express";
import { env } from "../config/env.js";
import { getTokenExpiryDate } from "./jwt.js";

const baseCookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const setRefreshTokenCookie = (res: Response, token: string) => {
  const expires = getTokenExpiryDate(token);

  res.cookie("refreshToken", token, {
    ...baseCookieOptions,
    expires,
  });
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie("refreshToken", {
    ...baseCookieOptions,
  });
};
