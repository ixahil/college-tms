import { prisma } from "#lib/prisma.js";
import { asyncHandler } from "#middlewares/index.js";
import { AppResponse } from "#utils/index.js";
import { getToursWithPagination } from "#utils/tours.js";

export const getAllTours = asyncHandler(async (req, res, next) => {
  const { limit = 10, page = 1, order = "asc", search = "" } = req.query;

  const country = Array.isArray(req.query?.country)
    ? req.query.country
    : req.query?.country?.split(",");

  const state = Array.isArray(req.query?.state)
    ? req.query.state
    : req.query?.state?.split(",");

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const sortOrder = order === "asc" ? "asc" : "desc";

  const data = await getToursWithPagination(
    search,
    state,
    country,
    pageNumber,
    pageSize,
    sortOrder
    // { status: "ACTIVE" }
  );

  res.status(200).json(new AppResponse(200, data, "Success"));
});

export const getAllFeaturedTours = asyncHandler(async (req, res, next) => {
  const { limit = 10, page = 1, order = "asc", search = "" } = req.query;

  const country = Array.isArray(req.query?.country)
    ? req.query.country
    : req.query?.country?.split(",");

  const state = Array.isArray(req.query.state)
    ? req.query.state
    : [req.query.stae];

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const sortOrder = order === "asc" ? "asc" : "desc";

  const data = await getToursWithPagination(
    search,
    state,
    country,
    pageNumber,
    pageSize,
    sortOrder,
    { isFeatured: true, status: "ACTIVE" }
  );

  // const tours = await prisma.tour.findMany({
  //   where: {
  //     OR: [
  //       {
  //         title: {
  //           startsWith: search,
  //           endsWith: search,
  //         },
  //         city: {
  //           contains: city,
  //         },
  //         state: {
  //           contains: state,
  //         },
  //       },
  //     ],
  //   },
  //   orderBy: {
  //     createdAt: sortOrder,
  //   },
  //   skip: (pageNumber - 1) * pageSize,
  //   take: pageSize,
  //   include: {
  //     images: {
  //       select: {
  //         url: true,
  //       },
  //     },
  //   },
  // });

  res.status(200).json(new AppResponse(200, data, "Success"));
});

export const getAllInternationTours = asyncHandler(async (req, res, next) => {
  const { limit = 10, page = 1, order = "asc", search = "" } = req.query;

  const country = Array.isArray(req.query?.country)
    ? req.query.country
    : req.query?.country?.split(",");

  const state = Array.isArray(req.query.state)
    ? req.query.state
    : [req.query.stae];

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const sortOrder = order === "asc" ? "asc" : "desc";

  const data = await getToursWithPagination(
    search,
    state,
    country,
    pageNumber,
    pageSize,
    sortOrder,
    {
      country: {
        not: {
          contains: "India",
        },
      },
      status: "ACTIVE",
    }
  );

  res.status(200).json(new AppResponse(200, data, "Success"));
});

export const getTourById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const tour = await prisma.tour.findUnique({
    where: { id: id },
    include: {
      agent: true,
    },
  });

  res.status(200).json(new AppResponse(200, tour, "Success"));
});

export const getCitiesNStates = asyncHandler(async (req, res, next) => {
  const { limit = 10, page = 1, order = "asc", search = "" } = req.query;

  const country = Array.isArray(req.query.country)
    ? req.query.country
    : [req.query.country];
  const state = Array.isArray(req.query.state)
    ? req.query.state
    : [req.query.stae];

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);
  const sortOrder = order === "asc" ? "asc" : "desc";

  const data = await prisma.tour.findMany({
    distinct: ["country", "state"],
    select: {
      country: true,
      state: true,
    },
  });

  res.status(200).json(new AppResponse(200, data, "Success"));
});

// const getToursWithPagination = async (
//   search,
//   city,
//   state,
//   pageNumber,
//   pageSize,
//   sortOrder,
//   conditions = {}
// ) => {
//   const query = {
//     where: {
//       AND: [
//         {
//           title: {
//             startsWith: search || "",
//             endsWith: search || "",
//           },
//           status: "ACTIVE",
//         },
//         {
//           OR: city?.map((c) => ({
//             city: {
//               contains: c,
//             },
//           })),
//         },
//         {
//           OR: state?.map((s) => ({
//             state: {
//               contains: s,
//             },
//           })),
//         },
//       ],
//       ...conditions,
//     },
//     orderBy: {
//       createdAt: sortOrder,
//     },
//     skip: (pageNumber - 1) * pageSize,
//     take: pageSize,
//   };

//   // Using a single transaction to get both tours and total count
//   const [tours, totalCount] = await prisma.$transaction([
//     prisma.tour.findMany(query),
//     prisma.tour.count({ where: query.where }),
//   ]);

//   const totalPages = Math.ceil(totalCount / pageSize); // Calculate total pages

//   return {
//     tours,
//     pagination: {
//       totalCount,
//       totalPages,
//       currentPage: pageNumber,
//     },
//   };
// };
