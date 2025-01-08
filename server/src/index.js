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

app.post(`/signup`, async (req, res) => {
  const { name, email, posts } = req.body;

  const postData = posts?.map((post) => {
    return { title: post?.title, content: post?.content };
  });

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  });
  res.json(result);
});

app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  });
  res.json(result);
});

app.put("/post/:id/views", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    res.json(post);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
});

app.put("/publish/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const postData = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        published: true,
      },
    });

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) || undefined },
      data: { published: !postData?.published },
    });
    res.json(updatedPost);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
});

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(post);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/user/:id/drafts", async (req, res) => {
  const { id } = req.params;

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: { published: false },
    });

  res.json(drafts);
});

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  res.json(post);
});

app.get("/feed", async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query;

  const or = searchString
    ? {
        OR: [{ title: { contains } }, { content: { contains } }],
      }
    : {};

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...or,
    },
    include: { author: true },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt,
    },
  });

  res.json(posts);
});

app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`)
);
