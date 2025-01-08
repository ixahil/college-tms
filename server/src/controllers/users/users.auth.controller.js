import { prisma } from "#lib/prisma.js";
import { generateTokens, generateTemporaryToken } from "#lib/index.js";
import { asyncHandler } from "#middlewares/index.js";
import { AppResponse, AppError, cookieOptions } from "#utils/index.js";
import bcryptjs from "bcryptjs";

// New User
export const register = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password)
    throw new AppError(400, "All fields are required");

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  // Create the agent
  const agent = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // Generate tokens
  const { refreshToken } = generateTokens(agent.id);
  const { hashedToken, tokenExpiry, unHashedToken } = generateTemporaryToken();

  const tokenExpiryDate = new Date(tokenExpiry);

  // Update agent with the refresh token and email verification data
  const updatedAgent = await prisma.user.update({
    where: { id: agent.id },
    data: {
      refreshToken,
      emailVerificationToken: hashedToken,
      emailVerificationTokenExpiresAt: tokenExpiryDate,
    },
    select: {
      name: true,
      email: true,
    },
  });

  res
    .status(201)
    .json(new AppResponse(201, updatedAgent, "User created successfully"));
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const agent = await prisma.user.findUnique({
    where: { email },
    select: { name: true, email: true, password: true },
  });

  if (!agent || !password) throw new AppError(401, "Invalid Credentials");

  const isPasswordValid = await bcryptjs.compare(password, agent.password);

  if (!isPasswordValid) throw new AppError(401, "Invalid Credentials");

  const { accessToken, refreshToken } = generateTokens(agent.id);

  res
    .status(200)
    .cookie("access_token", accessToken, cookieOptions)
    .cookie("refresh_token", refreshToken, cookieOptions)
    .json(new AppResponse(200, agent, "Logged in Successfully"));
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.status(200).json(new AppResponse(200, null, "Logged out successfully"));
});
