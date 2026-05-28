import dotenv from "dotenv";
import jwt  from "jsonwebtoken";

dotenv.config();

const parseNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseNumber(process.env.PORT, 5000),

  MONGO_URI: process.env.MONGO_URI || "",

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as jwt.SignOptions || "15m",
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as jwt.SignOptions || "7d",

  BCRYPT_SALT_ROUNDS: parseNumber(process.env.BCRYPT_SALT_ROUNDS, 10),
  RESET_PASSWORD_TOKEN_TTL_MINUTES: parseNumber(
    process.env.RESET_PASSWORD_TOKEN_TTL_MINUTES,
    30,
  ),

  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "",
};

export const 
validateEnv = () => {
  const missing: string[] = [];

  if (!env.MONGO_URI) missing.push("MONGO_URI");
  if (!env.JWT_ACCESS_SECRET) missing.push("JWT_ACCESS_SECRET");
  if (!env.JWT_REFRESH_SECRET) missing.push("JWT_REFRESH_SECRET");

  if (missing.length > 0) {
    throw new Error(`Missing required env variables: ${missing.join(", ")}`);
  }
};
