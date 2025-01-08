import { Prisma } from "@prisma/client";
import { AppError } from "#utils/index.js";
import { configDotenv } from "dotenv";

configDotenv();

const isDev = process.env.NODE_ENV === "development";

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (error instanceof Prisma.PrismaClientValidationError) {
    const messageMatch = error.message.match(/Argument .*/);
    const message = messageMatch ? messageMatch[0] : error.message;
    error = new AppError(400, `Validation Error: ${message}`);
  }

  // Check if it's a Prisma error based on error code
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const statusCode = 400; // You can set a default status code here

    switch (error.code) {
      case "P2002": // Unique constraint failed
        error = new AppError(
          statusCode,
          `Duplicate value for a unique field: ${error.meta?.target}`,
          error?.errors || [],
          error.stack
        );
        break;
      case "P2025": // Record not found
        error = new AppError(
          statusCode,
          "Record not found.",
          error?.errors || [],
          error.stack
        );
        break;
      case "P2003": // Foreign key constraint failed
        error = new AppError(
          statusCode,
          "Foreign key constraint failed.",
          error?.errors || [],
          error.stack
        );
        break;
      default:
        error = new AppError(
          statusCode,
          error.message || "A database error occurred.",
          error?.errors || [],
          error.stack
        );
    }
  }

  // If it's not a custom AppError, create one with default message
  if (!(error instanceof AppError)) {
    let message = error.message || "Something went wrong!";
    error = new AppError(error.statusCode || 500, message, error?.errors);
  }

  // Generic error response
  const response = {
    ...error,
    message: error.message,
    ...(isDev ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
