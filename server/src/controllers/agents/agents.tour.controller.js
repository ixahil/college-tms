import { asyncHandler } from "#middlewares/index.js";
import { prisma } from "#lib/prisma.js";
import { AppResponse } from "#utils/index.js";
import { handleNewImages } from "#utils/image.handler.js";
import { getToursWithPagination } from "#utils/tours.js";

export const createTour = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    price,
    comparePrice,
    duration,
    departureDate,
    groupSize,
    itinerary,
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
      duration,
      departureDate,
      groupSize,
      itinerary,
      state,
      country,
      status,
      agentId: req.user.id,
      images: images,
    },
  });

  res
    .status(201)
    .json(new AppResponse(201, tour, "Tour Created Successfully!"));
});

export const updateTour = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    comparePrice,
    duration,
    departureDate,
    groupSize,
    itinerary,
    state,
    country,
    status,
  } = req.body;

  const images = await handleNewImages(req.files?.images, title);

  const prevImages = Array.isArray(req.body?.images)
    ? req.body?.images
    : req.body?.images
    ? [req.body?.images]
    : [];

  const newImages = [...(images?.length > 0 ? images : []), ...prevImages];

  const tour = await prisma.tour.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      price: parseFloat(price),
      comparePrice: parseFloat(comparePrice),
      duration,
      departureDate,
      groupSize,
      itinerary,
      state,
      country,
      status,
      images: newImages,
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
      id: id,
    },
  });

  res
    .status(200)
    .json(new AppResponse(200, null, "Tour Deleted Successfully!"));
});

export const getTours = asyncHandler(async (req, res, next) => {
  const {
    limit = 10,
    page = 1,
    order = "asc",
    search = "",
    state = [],
    country = [],
  } = req.query;

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const sortOrder = order === "asc" ? "asc" : "desc";

  const tours = await getToursWithPagination(
    search,
    state,
    country,
    pageNumber,
    pageSize,
    sortOrder,
    { agentId: req.user.id }
  );

  res.status(200).json(new AppResponse(200, tours, "Success"));
});

export const getATour = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const tour = await prisma.tour.findUnique({
    where: {
      agentId: req.user.id,
      id: id,
    },
  });

  res.status(200).json(new AppResponse(200, tour, "success"));
});
