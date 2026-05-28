import { RequestHandler } from "express";
import { ZodSchema } from "zod";
import { HttpError } from "../utils/http.js";

export const validateBody = (schema: ZodSchema): RequestHandler => {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new HttpError("Validation error", 400, result.error.flatten()),
      );
    }

    req.body = result.data;
    return next();
  };
};
