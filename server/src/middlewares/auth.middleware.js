import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { prisma } from "#lib/prisma.js";
import { AppError } from "#utils/index.js";
import { asyncHandler } from "./index.js";

configDotenv();

const accessTokenSecret = process.env.ACCESSTOKENSECRET;

export const authenticate = (role) =>
  asyncHandler(async (req, res, next) => {
    const token =
      req.cookies?.access_token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new AppError(401, "Unauthorized Request!");

    try {
      // Verify the token
      const decoded = jwt.verify(token, accessTokenSecret);

      // Fetch the user or agent based on isAgent flag
      let user;
      if (role === "AGENT") {
        user = await prisma.agent.findUnique({
          where: { id: decoded.id },
        });
      } else {
        user = await prisma.user.findUnique({
          where: { id: decoded.id },
        });
      }
      if (!user) {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        throw new AppError(401, "Invalid Access Token!");
      }

      // Attach the user object to the request
      req.user = user;

      next();
    } catch (error) {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      throw new AppError(401, error?.message || "Invalid token!");
    }
  });
