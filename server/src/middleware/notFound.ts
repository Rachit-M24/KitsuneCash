import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http.js";

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new HttpError("Route not found", 404));
};
