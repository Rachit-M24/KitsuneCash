import jwt, {SignOptions, JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.js";
import { HttpError } from "./http.js";

const requireSecret = (secret: string, name: string) => {
  if (!secret) {
    throw new HttpError(`${name} is not set`, 500);
  }

  return secret;
};

export const signAccessToken = (userId: string) => {
  const secret = requireSecret(env.JWT_ACCESS_SECRET, "JWT_ACCESS_SECRET");
  const options: SignOptions = {
    expiresIn: env.JWT_ACCESS_EXPIRES as SignOptions["expiresIn"],
  };
  return jwt.sign({ sub: userId }, secret, options);
};

export const signRefreshToken = (userId: string) => {
  const secret = requireSecret(env.JWT_REFRESH_SECRET, "JWT_REFRESH_SECRET");
  const options: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRES as SignOptions["expiresIn"],
  };
  return jwt.sign({ sub: userId }, secret, options);
};

export const verifyAccessToken = (token: string) => {
  const secret = requireSecret(env.JWT_ACCESS_SECRET, "JWT_ACCESS_SECRET");
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new HttpError("Invalid or expired access token", 401);
  }
};

export const verifyRefreshToken = (token: string) => {
  const secret = requireSecret(env.JWT_REFRESH_SECRET, "JWT_REFRESH_SECRET");
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new HttpError("Invalid or expired refresh token", 401);
  }
};

export const getTokenExpiryDate = (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload | null;
  if (!decoded?.exp) {
    return undefined;
  }

  return new Date(decoded.exp * 1000);
};
