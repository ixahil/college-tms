import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { errorHandler } from "#middlewares/index.js";

const __dirname = import.meta.dirname;

// Routes Imports
import {
  agentsAuthRouter,
  agentsTourRouter,
  agentsUserRouter,
} from "#routes/agents/index.js";
import { toursRouter } from "#routes/tours/index.js";
import { usersAuthRouter } from "#routes/users/index.js";

dotenv.configDotenv();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

// MIDDLEWARES
app.use(cors(corsOptions));
app.use("/static", express.static(path.join(__dirname, "..", "public")));
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// IMPLEMENTING ROUTES

// AGENTS
app.use("/api/v1/agents/tours", agentsTourRouter);
app.use("/api/v1/agents/auth", agentsAuthRouter);
app.use("/api/v1/agents", agentsUserRouter);

// USERS
app.use("/api/v1/users", usersAuthRouter);

// TOURS
app.use("/api/v1/public/tours", toursRouter);

app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`)
);
