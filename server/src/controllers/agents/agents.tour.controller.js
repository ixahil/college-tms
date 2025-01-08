import { asyncHandler } from "#middlewares/index.js";
import { prisma } from "#lib/prisma.js";
import { AppResponse } from "#utils/index.js";
import { handleNewImages } from "#utils/image.handler.js";

export const createTour = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    price,
    comparePrice,
    city,
    state,
    country,
    status,
  } = req.body;

  const images = await handleNewImages(req.files?.images, title);

  const tour = await prisma.tour.create({
    data: {
      title,
      description,
      price: parseFloat(price),
      comparePrice: parseFloat(comparePrice),
      city,
      state,
      country,
      status,
      agentId: req.user.id,
      images: {
        create: images.map((url) => ({
          url,
        })),
      },
    },
  });

  res
    .status(201)
    .json(new AppResponse(201, tour, "Tour Created Successfully!"));
});

export const updateTour = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, comparePrice, location, status } =
    req.body;

  const images = await handleNewImages(req.files?.images, title);

  const tour = await prisma.tour.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      description,
      price: parseFloat(price),
      comparePrice: parseFloat(comparePrice),
      location,
      status,
      images: {
        create: images.map((url) => ({
          url,
        })),
      },
    },
  });

  res
    .status(200)
    .json(new AppResponse(200, tour, "Tour Updated Successfully!"));
});

export const deleteTour = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await prisma.tour.delete({
    where: {
      id: parseInt(id),
    },
  });

  res
    .status(200)
    .json(new AppResponse(200, null, "Tour Deleted Successfully!"));
});

export const getTours = asyncHandler(async (req, res, next) => {
  const { limit = 10, page = 1, order = "asc", search = "" } = req.query;

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const sortOrder = order === "asc" ? "asc" : "desc";

  const tours = await prisma.tour.findMany({
    where: {
      agentId: req.user.id,
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

export const getATour = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const tour = await prisma.tour.findUnique({
    where: {
      agentId: req.user.id,
      id: parseInt(id),
    },
    include: {
      images: {
        select: {
          url: true,
        },
      },
    },
  });

  res.status(200).json(new AppResponse(200, tour, "success"));
});
