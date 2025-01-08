import { asyncHandler } from "#middlewares/index.js";
import { prisma } from "#lib/prisma.js";
import { AppResponse, AppError } from "#utils/index.js";

export const getAgentById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (req.user.id != id)
    throw new AppError(401, "You are not authorized to access this resource");

  const agent = await prisma.agent.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      name: true,
      email: true,
    },
  });

  res.status(201).json(new AppResponse(200, agent, "Success"));
});
