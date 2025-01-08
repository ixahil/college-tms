import { prisma } from "#lib/prisma.js";
import { asyncHandler } from "#middlewares/index.js";
import { AppResponse } from "#utils/index.js";

export const getAllTours = asyncHandler(async (req, res, next) => {
  const { limit = 10, page = 1, order = "asc", search = "" } = req.query;

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const sortOrder = order === "asc" ? "asc" : "desc";

  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          title: {
            startsWith: search,
          },
        },
        {
          title: {
            endsWith: search,
          },
        },
      ],
    },
    orderBy: {
      createdAt: sortOrder,
    },
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
    include: {
      images: {
        select: {
          url: true,
        },
      },
    },
  });

  res.status(200).json(new AppResponse(200, tours, "Success"));
});

export const getTourById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const tour = await prisma.tour.findUnique({ where: { id: parseInt(id) } });

  res.status(200).json(new AppResponse(200, tour, "Success"));
});
