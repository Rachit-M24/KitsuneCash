import User, { UserDocument } from "./user.model.js";
import { env } from "../../config/env.js";
import { comparePassword, hashPassword } from "../../utils/password.js";
import {
  getTokenExpiryDate,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";
import { generateResetToken, hashToken } from "../../utils/crypto.js";
import { HttpError } from "../../utils/http.js";

const toPublicUser = (user: UserDocument) => {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    aiAssistantName: user.aiAssistantName,
    aiAssistantStatus: user.aiAssistantStatus,
  };
};

const issueTokens = async (userId: string) => {
  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken(userId);
  const refreshTokenHash = hashToken(refreshToken);
  const refreshTokenExpiresAt = getTokenExpiryDate(refreshToken);

  await User.findByIdAndUpdate(userId, {
    refreshTokenHash,
    refreshTokenExpiresAt,
  });

  return { accessToken, refreshToken };
};

export const register = async (input: {
  username: string;
  email: string;
  password: string;
}) => {
  const existingUser = await User.findOne({ email: input.email });

  if (existingUser) {
    throw new HttpError("Email already in use", 409);
  }

  const passwordHash = await hashPassword(input.password);
  const user = await User.create({
    username: input.username,
    email: input.email,
    passwordHash,
  });

  const tokens = await issueTokens(user._id.toString());

  return {
    user: toPublicUser(user),
    ...tokens,
  };
};

export const login = async (input: { email: string; password: string }) => {
  const user = await User.findOne({ email: input.email }).select(
    "+passwordHash",
  );

  if (!user) {
    throw new HttpError("Invalid email or password", 401);
  }

  const passwordMatches = await comparePassword(
    input.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    throw new HttpError("Invalid email or password", 401);
  }

  const tokens = await issueTokens(user._id.toString());

  return {
    user: toPublicUser(user),
    ...tokens,
  };
};

export const getCurrentUser = async (token: string) => {
  const payload = verifyAccessToken(token);

  if (!payload.sub) {
    throw new HttpError("Invalid token", 401);
  }
  const user = await User.findById(payload.sub);
  if (!user) {
    throw new HttpError("User not found", 404);
  }
  return { user: toPublicUser(user) };
};

export const refresh = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);

  if (!payload.sub) {
    throw new HttpError("Invalid refresh token", 401);
  }

  const user = await User.findById(payload.sub).select("+refreshTokenHash");

  if (!user || !user.refreshTokenHash) {
    throw new HttpError("Refresh token revoked", 401);
  }

  const incomingHash = hashToken(refreshToken);

  if (incomingHash !== user.refreshTokenHash) {
    throw new HttpError("Refresh token mismatch", 401);
  }

  const tokens = await issueTokens(user._id.toString());

  return {
    user: toPublicUser(user),
    ...tokens,
  };
};

export const logout = async (refreshToken?: string) => {
  if (!refreshToken) {
    return;
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    if (!payload.sub) {
      return;
    }

    await User.findByIdAndUpdate(payload.sub, {
      refreshTokenHash: undefined,
      refreshTokenExpiresAt: undefined,
    });
  } catch (error) {
    return;
  }
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    return { resetToken: undefined as string | undefined };
  }

  const { token, tokenHash } = generateResetToken();
  const resetExpiresAt = new Date(
    Date.now() + env.RESET_PASSWORD_TOKEN_TTL_MINUTES * 60 * 1000,
  );

  await User.findByIdAndUpdate(user._id, {
    passwordResetTokenHash: tokenHash,
    passwordResetExpiresAt: resetExpiresAt,
  });

  return { resetToken: token };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const tokenHash = hashToken(token);

  const user = await User.findOne({
    passwordResetTokenHash: tokenHash,
    passwordResetExpiresAt: { $gt: new Date() },
  }).select("+passwordHash");

  if (!user) {
    throw new HttpError("Invalid or expired reset token", 400);
  }

  user.passwordHash = await hashPassword(newPassword);
  user.passwordResetTokenHash = undefined;
  user.passwordResetExpiresAt = undefined;
  user.refreshTokenHash = undefined;
  user.refreshTokenExpiresAt = undefined;
  user.passwordChangedAt = new Date();

  await user.save();

  const tokens = await issueTokens(user._id.toString());

  return {
    user: toPublicUser(user),
    ...tokens,
  };
};
