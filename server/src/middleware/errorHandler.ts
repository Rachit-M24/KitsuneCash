import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http";
import { env } from "../config/env";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err instanceof HttpError ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : "Internal server error";

  const payload: Record<string, unknown> = { message };

  if (err instanceof HttpError && err.details) {
    payload.details = err.details;
  }

  if (env.NODE_ENV !== "production" && err instanceof Error) {
    payload.stack = err.stack;
  }

  res.status(statusCode).json(payload);
};
