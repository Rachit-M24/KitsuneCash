import { RequestHandler } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { HttpError } from "../utils/http";

export const authenticate: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new HttpError("Missing access token", 401));
  }

  const token = header.split(" ")[1];
  const payload = verifyAccessToken(token);

  if (!payload.sub) {
    return next(new HttpError("Invalid access token", 401));
  }

  req.user = { id: payload.sub };
  return next();
};
