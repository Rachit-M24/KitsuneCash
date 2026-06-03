import bcrypt from "bcryptjs";
import { env } from "../config/env.js";

export const hashPassword = async (plain: string) => {
  return bcrypt.hash(plain, env.BCRYPT_SALT_ROUNDS);
};

export const comparePassword = async (plain: string, hash: string) => {
  return bcrypt.compare(plain, hash);
};
