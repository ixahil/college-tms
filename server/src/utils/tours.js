import { prisma } from "#lib/prisma.js";

export const getToursWithPagination = async (
  search = "",
  state = [],
  country = [],
  pageNumber = 1,
  pageSize = 10,
  sortOrder = "desc",
  conditions = {}
) => {
  // Ensure pagination values are valid
  const page = Math.max(1, pageNumber); // Minimum page number is 1
  const size = Math.max(1, pageSize); // Minimum page size is 1

  // Build dynamic filters for `city` and `state`

  const stateFilter = state.length
    ? {
        OR: state.map((s) => ({
          state: {
            contains: s,
            mode: "insensitive", // Optional: case-insensitive search
          },
        })),
      }
    : {};

  const countryFilter = country.length
    ? {
        OR: country.map((s) => ({
          country: {
            contains: s,
            mode: "insensitive",
          },
        })),
      }
    : {};

  // Construct the query
  const query = {
    where: {
      ...conditions,
      AND: [
        {
          title: {
            startsWith: search,
            mode: "insensitive",
          },
        },
        stateFilter,
        countryFilter,
      ],
    },
    orderBy: {
      createdAt: sortOrder || "desc", // Default to descending sort order
    },
    skip: (page - 1) * size,
    take: size,
  };

  // Execute the transaction to fetch tours and the total count
  const [tours, totalCount] = await prisma.$transaction([
    prisma.tour.findMany(query),
    prisma.tour.count({ where: query.where }),
  ]);

  const totalPages = Math.ceil(totalCount / size); // Calculate total pages

  return {
    tours,
    pagination: {
      totalCount,
      totalPages,
      currentPage: page,
      pageSize: size,
    },
  };
};
